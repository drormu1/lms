export interface ISearchState {
    results: Array<string>;
    total: number;
    term: string;
    page: number;
    size: number;
    subjects: Array<string>;
    selectedSubjects: Array<string>;
    selectedRow: Number | undefined;
}