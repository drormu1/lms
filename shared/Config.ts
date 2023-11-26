export class Config {
    static  indexName =  'fabric_person' as string      
    static fields =  ['full_name_fd','rank','birth_city'];
    static aggregations= ['rank','birth_city'];
    
    static elasticUrl =  'http://localhost:9200' as string;
}