import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() UID;
@Input() vendor=String('');
@Input() status=String('');
@Input() date;

  constructor(
    
  ) { 
    this.UID=0;
    this.date=new Date();
    
  }

  ngOnInit(): void {
  }

}
