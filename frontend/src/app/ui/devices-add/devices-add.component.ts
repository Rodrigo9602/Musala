import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-devices-add',
  templateUrl: './devices-add.component.html',
  styleUrls: ['./devices-add.component.css'],
  providers: [GatewayService],
})
export class DevicesAddComponent implements OnInit {
  
  public device:Device[];
  public date = new Date();
  public serialNumber;
  constructor(
    private _gatewayService: GatewayService,
    private _route: ActivatedRoute,
    private _router: Router,
    

  ) { 
    
    this.device = [new Device(0,'',this.date,'')]
    this.serialNumber = '';
  }

  ngOnInit(): void {
    
    this._route.params.subscribe((params: Params)=>{
      this.serialNumber=params['serial'];      
    });
    
    
    
  }
  onSubmit(){    
    this._gatewayService.addDevice(this.serialNumber,this.device).subscribe(
      res=>{
       alert(res.message);       
      },
      err=>{
        alert(err.message);
      }
    )
  }
}
