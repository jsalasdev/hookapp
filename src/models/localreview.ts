export class LocalReview {
    _id:string
    createdAt: Date
    userId: number
    localId: number
    rating:number
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}