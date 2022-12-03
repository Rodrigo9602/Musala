import { Injectable } from "@angular/core";
import { Device } from "../models/device.model";

@Injectable()
export class DeviceService{
    holaMundo() {
        return 'Hello World';
    }
}