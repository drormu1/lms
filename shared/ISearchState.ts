import { ISelectedAggs } from "./ISelectedAggs";

export interface ISearchState {
       
    total: number;
    term: string;
    page: number;
    size: number;
    results: Array<string>;
    selectedRowInGrid: number;
    selectedAggs: ISelectedAggs;
}

