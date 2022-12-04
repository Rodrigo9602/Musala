import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/models/gateway.model';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [GatewayService],
})
export class SearchComponent implements OnInit {
  public serialNumber;
  public gateway:Gateway;
  constructor(
    private _gatewayService:GatewayService,
  ) {
    this.serialNumber='';
    this.gateway=  new Gateway('','','',[]);
   }

  ngOnInit(): void {

  }
  onSubmit(){
    this._gatewayService.getGatewayBySerial(this.serialNumber).subscribe(
      res=>{        
        this.gateway=res.gateway[0];        
      },
      err=>{
        alert(err.message);
      }
    )
  }
}
