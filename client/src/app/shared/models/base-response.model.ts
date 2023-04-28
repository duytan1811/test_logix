export class BaseResponse<T>{
    type: string;
    data: T | null;
    message: string;
    key: string;

    constructor() {
        this.type = 'success';
        this.key = '';
        this.message = '';
        this.data = null;
    }
}