export interface ISearchState {
    results: Array<string>;
    selectedCities :Array<string>;
    
    total: number;
    term: string;
    page: number;
    size: number;
    selectedRowInGrid: number;  
    
    

}