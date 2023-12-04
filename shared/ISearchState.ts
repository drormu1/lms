import { ISelectedAggs } from "./ISelectedAggs";

export interface ISearchState {

    total: number;
    term: string;
    page: number;
    size: number;
    results: [];
    aggs: {};
    selectedRowInGrid: string;
    selectedAggs: ISelectedAggs;
}

