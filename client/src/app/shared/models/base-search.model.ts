import { Paginator } from "./paginator.model";
import { Sorting } from "./sorting.model";

export class BaseSearchModel<T> {
    paginator: Paginator;
    searchParams: T;
    sorting: Sorting;

    constructor() {
        this.paginator = new Paginator();
        this.sorting = new Sorting();
    }
}