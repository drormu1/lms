import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ISearchResponse } from '../../../shared/ISearchResponse';
import { ISearchRequest } from '../../../shared/ISearchRequest';
import { Config } from '../../../shared/Config';

import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Client } from '@elastic/elasticsearch';

import * as _ from 'lodash';
//import { Logger } from '../logger/logger';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
 
 
  readonly fields : string[] = Config.fields

  readonly client = new Client({
    node: 'http://localhost:9200',
    requestTimeout: 60000,
  });
  
  // async serch(searchRequest: ISearchRequest):Promise<string[]> {
    
  //   const response = [];
  //   const [sujectsResponse] = await Promise.all([
              
  //       axios.get('https://jsonplaceholder.typicode.com/comments'),
  //     ]);
      
  //     return   sujectsResponse.data;//?.map(u =>  u.name); 
  //   }

    async search(searchRequest: ISearchRequest):Promise<ISearchResponse> {
      try {
        const indexName = Config.indexName
        const searchResponse : ISearchResponse = {results:[],total:0};
        //const searchRequest : SearchRequest 

        // searchRequest.term = searchRequest.term;
        // searchRequest.page = searchRequest.page;
        // searchRequest.size = searchRequest.size;
        console.log('searchRequest :' , searchRequest);
        searchRequest.term = _.trim( searchRequest.term);
        if( searchRequest.term.startsWith('"') && searchRequest.term.endsWith('"'))
        {
          searchRequest.term = searchRequest.term.replace(/"/g, '')
        //  searchRequest.andCondition = 'and';
        }
  
  
  //     var mustArrays = this.helper.appenedRoles(searchRequest,roleIds).
  //                      concat(this.helper.appenedAggs(searchRequest)).
   //                     concat(this.helper.appenedSpecialAggregations(searchRequest));
       
        const results = await this.client.search({
          index: indexName,
          _source: false,
  
          //sort: [searchRequest.sort + ':' + searchRequest.sortDirection],
          body: {
            fields: this.fields, //return fields  
            size: searchRequest.size,        
            //sort: this.helper.getSorting(searchRequest),
            from: searchRequest.size * searchRequest.page,
            highlight: {            
              pre_tags: ["<em>"],
              post_tags: ["</em>"],
              fields: {
                "*": { "fragment_size": 100, "number_of_fragments": 5  }
              }
            },
            //aggs: this.helper.getAggsStr(indexSettings.aggregation),
            query: {
              bool: {     
                minimum_should_match: 1        ,
                should: this.getQuery(searchRequest),
                //must:mustArrays,
                
              }
            }
  
          }
        },{ meta: true })
        .then(data=> {   
          //logger.info(data.meta.request.params.body);
          //Logger.info("***********");
          //console.log(data.meta.request.params.path);
          //console.log(data.meta.request.params.body);
          //logger.info(data);

           
        
            searchResponse.results=  data.body.hits.hits.map(h => { 
              return {
                id:h._id,
                name:h.fields.full_name_fd[0],
                rank:h.fields.rank[0],
                city:h.fields.birth_city[0]}});

            searchResponse.total= data.body.hits.total as number;
            console.log('total ' ,searchResponse.total);

          return searchResponse;
        })
        .catch(e=>{
          //Logger.error(e.meta.meta.request.params.path + "***************" + e.meta.meta.request.params.body);
          console.error(e.meta.meta.request.params.path + "***************" + e.meta.meta.request.params.body);        
        });
  
      
      return searchResponse;
  
        
       
      }
      catch (err) {        
        //Logger.error(err.message);
        console.log(err.message);
        //console.log(err);
        return err;
      }
    };


    
    getQuery(searchRequest)
    {    
      const fields:string[] = this.fields;
      
      var  arr = []; 
      console.log('term is ' +searchRequest.term);
        arr.push({
        multi_match:{
          boost : 4,
          fields: fields.join().replace(/.melingo/g, '').split(',') ,//search fields 
          query:  searchRequest.term,
          lenient: true,
          fuzziness:  '0',
          operator:   'and'
          }});

      return arr;
    } 

  } 
