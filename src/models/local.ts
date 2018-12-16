export class Local {
    _id:string
    createdAt: Date
    name: string
    availableHookahs: number
    location :{
        description: string,
        latLng: {
            lat:number,
            lng:number
        }
    }
    picture: string
    userOwner: number
    premiumTobaccoPrice: number
    tobaccoPrice: number
    tobaccos:number[]
    state:string
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}