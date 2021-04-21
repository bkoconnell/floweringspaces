// import Angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import services & models
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

  // constructor: define parameters to inject an instance within this class
  constructor(
    private flowerDataService: FlowerDataService,
    private router: Router
    ) { }

  // method to add flowers
  private addFlower(): void {
    console.log('Inside FlowerListingComponent#addFlower'); // console output
    this.router.navigate(['add-flower']); // use router to navigate to 'add-flower' route
  }

  // method to get flowers
  private getFlowers(): void {
    console.log('Inside FlowerListingComponent#getFlowers'); // console output
    this.message = 'Searching for flowers';
    // invoke service method getFlowers() to get flower array(s)
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
