/**
 * Flower Listing component
 */

// import Angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import services & models
import { FlowerDataService } from '../services/flower-data.service';
import { AuthenticationService } from '../services/authentication.service';
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
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  /**
   * Private Method:
   * navigate to 'add flower' form when 'add flower' button is clicked
   */
  private addFlower(): void {    
    console.log('Inside FlowerListingComponent#addFlower'); // browser console output
    this.router.navigate(['add-flower']);
  }

  /**
   * Private Method: get flowers array for rendering view
   */
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

  /**
   * Method to toggle 'Add Flower' button based on user login status
   */ 
     public isLoggedIn(): boolean {
      // check to see if user is logged in
      return this.authenticationService.isLoggedIn();
    }

  /**
   * Callback method to getFlowers() before rendering view
   */
  ngOnInit(): void {
    this.getFlowers();
  }
}
