/**
 * Flower Listing component
 */

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

  flowers: Flower[];
  message: string;

  constructor(
    private flowerDataService: FlowerDataService,
    private router: Router
    ) { }

  // private method to navigate to 'add flower' form (when 'add flower' button is clicked)
  private addFlower(): void {
    // browser console output
    console.log('Inside FlowerListingComponent#addFlower');
    this.router.navigate(['add-flower']);
  }

  // private method to get flowers array for rendering view
  private getFlowers(): void {
    // browser console output
    console.log('Inside FlowerListingComponent#getFlowers');
    this.message = 'Searching for flowers';
    // invoke service method getFlowers() to get flower array
    this.flowerDataService
      .getFlowers()
        .then(foundFlowers => {
          // message assigned based on if flowers are found or not found
          this.message = foundFlowers.length > 0 ? '' : 'No flowers found';
          this.flowers = foundFlowers;
        });
  }

  // callback method to get flowers before rendering view
  ngOnInit(): void {
    this.getFlowers();
  }
}
