import { Component, OnInit } from '@angular/core';
import { GatewayService } from 'src/app/services/gateway.service';
import { Device } from 'src/app/models/device.model';
import { Gateway } from 'src/app/models/gateway.model';


@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css'],
  providers: [GatewayService],
})
export class GatewaysComponent implements OnInit {
public devices;
public date = new Date();
public gateways: Gateway[];
public addDevice;
public delDevice;

  constructor(
    private _gatewayService:GatewayService,

  ) {  
    
    this.devices = [
      new Device(86588774,'Intel',this.date,'Online'),
      new Device(87744556,'Samsung',this.date,'Offline'),
      new Device(83588996,'RockChip',this.date,'Online'),
      new Device(84411225,'Surgea',this.date,'Offline'),
    ];
    this.gateways = [
      new Gateway('tegsgej-r45wyn-36hhsu', 'Gateway_0','192.168.42.584',this.devices),
      new Gateway('wwerwe-36hhsu-ew4sd', 'Gateway_1','192.168.42.584',this.devices),
      new Gateway('wwerwe-ew4sd-wret5gg', 'Gateway_2','192.168.42.584',this.devices),
    ]
    this.addDevice='';
    this.delDevice='';
   }

  ngOnInit(): void {
    this._gatewayService.getGateways().subscribe(
      res =>{
        this.gateways = res.gateways;
      },
      err=>{
       alert(err.message);
      }
    )
    
  }
  select(event: any, gate: Gateway){
   this.addDevice = '/add-device/'+gate.serial;
   this.delDevice = '/del-device/'+gate.serial;
   
  }

}
