export class Local {
    _id:string
    createdAt: Date
    name: string
    availableHookahs: number
    location :{
        description: String,
        type: {
            type: "String",
            required: true,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: [Number]
    }
    picture: string
    userOwner: number
    premiumTobaccoPrice: number
    tobaccoPrice: number
    tobaccos:number[]
    status:string
    isPremium: boolean
    localSpace:number
    hasAirConditioner:boolean
    hasSoccer:boolean
    hasMusic:boolean
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}