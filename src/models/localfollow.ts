export class LocalFollow {
    
    _id:string
    createdAt: Date
    userId: number
    localId: number
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}