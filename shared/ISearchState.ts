export interface ISearchState {
    results: Array<string>;
    selectedAggs: ISelectedAggs;
    selectedCities: Array<string>;

    total: number;
    term: string;
    page: number;
    size: number;
    selectedRowInGrid: number;
}

export interface ISelectedAggs {
    [agg: string]: string[];

}