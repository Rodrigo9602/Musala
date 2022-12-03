import { Device } from "./device.model";

export class Gateway {
    constructor(
        public serial: String,
        public name: String,
        public ipv4: String,
        public devices: Device[],
    ){}
}