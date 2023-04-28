export class BaseModel {
    _id: string;
    index: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this._id = '';
        this.status = '';
        this.index = 1;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}