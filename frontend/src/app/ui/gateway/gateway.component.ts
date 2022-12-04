import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/models/gateway.model';
import { Device } from 'src/app/models/device.model';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
  providers: [GatewayService],
})
export class GatewayComponent implements OnInit {
public gateway;
public date = new Date();
public devices:Device[];

  constructor(
    private _gatewayService: GatewayService,
  ) {       
    this.devices=[new Device(0,'',this.date,'')];
    this.gateway = new Gateway('','','',this.devices);
    
  }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.gateway.name===''|| this.gateway.ipv4===''){
      alert('Faltan datos por enviar');      
    }
    else{
      alert('Formulario enviado');
      this._gatewayService.save(this.gateway).subscribe(
        res=>{       
          console.log(res.message);
        },
        err=>{
          alert(err.message);
        }
      )
    }
  }
  
}
