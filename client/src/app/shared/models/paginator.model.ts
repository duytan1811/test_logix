export class Paginator {
    page: number;
    pageSize: number;
    total: number;

    constructor() {
        this.page = 0;
        this.pageSize = 3;
        this.total = 0;
    }
}