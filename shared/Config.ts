export class Config {
    static  indexName =  'fabric_person' as string      
    static fields =  ['full_name_fd','rank','birth_city'];
    static aggregations= ['rank','birth_city'];
    static pageSize = 5 as number;
    //static elasticUrl =  '' as string;
}