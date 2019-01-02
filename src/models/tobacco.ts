export class Tobacco {
    _id:string
    createdAt: Date
    name: string
    brand: number
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}