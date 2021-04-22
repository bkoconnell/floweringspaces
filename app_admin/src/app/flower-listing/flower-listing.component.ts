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

  // define constructor parameters (to inject an instance when class is instantiated)
  constructor(
    private flowerDataService: FlowerDataService,
    private router: Router
    ) { }

  // private method to navigate to 'add flower' form (when 'add flower' button is clicked)
  private addFlower(): void {
    console.log('Inside FlowerListingComponent#addFlower'); // console output
    this.router.navigate(['add-flower']); // router navigates to add-flower path
  }

  // private method to get flowers array for rendering view
  private getFlowers(): void {
    console.log('Inside FlowerListingComponent#getFlowers'); // console output
    this.message = 'Searching for flowers';
    // invoke service method getFlowers() to get flower array
    this.flowerDataService
      .getFlowers()
        .then(foundFlowers => {
          this.message = foundFlowers.length > 0 ? '' : 'No flowers found'; // message assignment based on flowers found or not
          this.flowers = foundFlowers;
        });
  }

  // callback method to get flowers before rendering view
  ngOnInit(): void {
    this.getFlowers();
  }
}
