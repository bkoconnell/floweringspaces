import { Component, OnInit } from '@angular/core';
import { flowers } from '../data/flowers';

@Component({
  selector: 'app-flower-listing',
  templateUrl: './flower-listing.component.html',
  styleUrls: ['./flower-listing.component.css']
})
export class FlowerListingComponent implements OnInit {

  flowers: Array<any> = flowers; // declare flowers array

  constructor() { }

  ngOnInit() {
  }

}
