// import angular modules
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.css']
})
export class FlowerCardComponent implements OnInit {

  @Input('flower') flower: any;
  constructor() { }

  ngOnInit() {
  }
  
}
