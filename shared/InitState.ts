import { Metadata } from "./Metadata";





export interface InitState {
    loading: boolean;
    metadata: Metadata | undefined;
    error: string | undefined;
}
