export class Device{
    constructor(
        public uid: number,
        public vendor: string,
        public date: Date,
        public status: string,
    ){}
}