import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Metadata } from '../../../shared/Metadata';
import { Config } from '../../../shared/Config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Client } from '@elastic/elasticsearch';
import { Headers } from '@nestjs/common';

@Injectable()
export class InitService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  readonly client = new Client({
    node: Config.elasticUrl,
    requestTimeout: 60000,
  });

  getHello(): string {
    return 'Hello World!';
  }

  async init(@Headers() headers):Promise<Metadata> {

    const metadata : Metadata = {
      userId: undefined,
      aggregations: undefined,      
    }
    
   
    // //call 3rd party api
    // const [sujectsResponse, commentsResponse] = await Promise.all([
        
    //     axios.get('https://jsonplaceholder.typicode.com/users'),
    //     axios.get('https://jsonplaceholder.typicode.com/comments'),
    //   ]);
    //   metadata.subjects = sujectsResponse.data?.map(u =>  u.name);    
    //   metadata.comments = commentsResponse.data; 
           
        metadata.userId =   headers['x-iisnode-auth_user']?.replace('_P','').replace('MOD.INT\\','') ?? 'U12345';
        metadata.aggregations =  await this.getAllAggregations();
        return metadata;
  }

       
   async getAllAggregations() : Promise<any> {

    const results = {cities:[],ranks:[]}; 
 
    const data = await this.client.search({
          index: Config.indexName,
          size: 0,
          body: {
            "aggs": JSON.parse(this.concatAllAggregations())
          }
        },{ meta: true }) 
        .then(data=> { 
          const aggs=  data.body.aggregations as  any;
          results.cities =aggs?.birth_city?.buckets.map(a=>a.key).sort()  
          results.ranks =aggs?.rank?.buckets.map(a=>a.key)
          
        })
        .catch(e=>{
          //Logger.error(e.meta.meta.request.params.path + "***************" + e.meta.meta.request.params.body);
          console.error(e.meta.meta.request.params.path + "***************" + e.meta.meta.request.params.body);        
        });
        return results;
  };

  concatAllAggregations()
  {    
     let arr=Config.aggregations;    
     let str='';
     
     for(let i=0; i < arr.length ; i++)
      {              
       str +=  `
       "${arr[i]}" : {
         "terms": { 
           "field": "${arr[i]}.keyword" ,
           "size": 1000        
         }
         },`       
     }
     str = str.slice(0,-1);
     str= `{${str}}`;     

     return str;
  }
}
