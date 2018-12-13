export class User {
    _id: string;
    firstName: string;
    lastName: string;
    picture: string;
    providerId: string;
    provider: string;
    firstLogin: boolean;
    userType: string;
    state: boolean;
    favoriteLocals:number[];
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}