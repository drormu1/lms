import { ISelectedAggs } from "./ISelectedAggs";

export interface ISearchState {

    total: number;
    term: string;
    page: number;
    size: number;
    results: []
    selectedRowInGrid: string;
    selectedAggs: ISelectedAggs;
}

