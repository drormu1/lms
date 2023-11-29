import { ISelectedAggs } from "./ISelectedAggs";


export interface ISearchRequest {
    term: string;
    page: number;
    size: number;
    selectedAggs: ISelectedAggs;
}