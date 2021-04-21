// import Angular modules
import { Component, OnInit } from '@angular/core';
// import trip-data service & trip model
import { FlowerDataService } from '../services/flower-data.service';
import { Flower } from '../models/flower';

@Component({
  selector: 'app-flower-listing',
  templateUrl: './flower-listing.component.html',
  styleUrls: ['./flower-listing.component.css'],
  providers: [FlowerDataService]
})

export class FlowerListingComponent implements OnInit {

  flowers: Flower[]; // declare flowers array

  message: string; // declare message string

  constructor(private flowerDataService: FlowerDataService) { } 

  private getFlowers(): void {
    console.log('Inside FlowerListingComponent#getFlowers');
    this.message = 'Searching for flowers';
    this.flowerDataService
      .getFlowers()
        .then(foundFlowers => {
          this.message = foundFlowers.length > 0 ? '' : 'No flowers found';
          this.flowers = foundFlowers;
        });
  }

  // callback method to get flowers before rendering view
  ngOnInit(): void {
    this.getFlowers();
  }
}
