import { Injectable } from "@angular/core";
import { Gateway } from "../models/gateway.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { Device } from "../models/device.model";

@Injectable()
export class GatewayService{
public url:string;

    constructor(
        private _http: HttpClient,

    ){
        this.url=global.url;
    }

    test(){
        return 'Gateway service working';
    }
    getGateways():Observable<any>{
        
        return this._http.get(this.url);
    }
    getGatewayBySerial(serial:String):Observable<any>{
        return this._http.get(this.url+serial);
    }
    save(gateway:Gateway):Observable<any>{
        let params = JSON.stringify(gateway);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url, params, {headers: headers});
    }
    addDevice(serial:String, device:Device[]):Observable<any>{
        let params = JSON.stringify(device);
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+serial,params,{headers: headers});
    }
    delDevices(serial:String, uid:String):Observable<any>{
        let params = JSON.stringify({"UID":Number(uid)});
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'del/'+serial,params,{headers: headers});
    }
}