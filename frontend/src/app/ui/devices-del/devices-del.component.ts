import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';
@Component({
  selector: 'app-devices-del',
  templateUrl: './devices-del.component.html',
  styleUrls: ['./devices-del.component.css'],
  providers:[GatewayService],
})
export class DevicesDelComponent implements OnInit {
  public serialNumber;
  public UID;
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _gatewayService: GatewayService,
  ) { 
    this.serialNumber='';
    this.UID='';
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params)=>{
      this.serialNumber = params['serial'];
      
    });
    
  }
  onSubmit(){
    alert("Data sended");
    this._gatewayService.delDevices(this.serialNumber, this.UID).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
