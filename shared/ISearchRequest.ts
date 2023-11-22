export interface ISearchRequest {    
    term: string;
    page: number;
    size: number;    
    selectedSubjects: Array<string>;    
}