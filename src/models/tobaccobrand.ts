export class TobaccoBrand {
    _id:string
    createdAt: Date
    name: string
    isPremium: boolean
    picture: String
    tobaccos: number[]
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}