/**
 * Flower Card component
 */

// import Angular modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import models & services
import { Flower } from '../models/flower';
import { FlowerDataService } from '../services/flower-data.service';
import { AuthenticationDataService, AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.css']
})
export class FlowerCardComponent implements OnInit {

  @Input('flower') flower: Flower;

  submitted = false;   // set Boolean for Delete button

  constructor(
    private router: Router,
    private flowerService: FlowerDataService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  /**
   * Method for EditFlower button functionality
   */
  private editFlower(flower: Flower): void {
    // stash the flower code in browser's local storage for 'edit component' to retrieve later
    localStorage.removeItem("editFlowerCode");
    localStorage.setItem("editFlowerCode", flower.code);
    // navigate
    this.router.navigate(['edit-flower']);
  }

  /**
   * Method for DeleteFlower button functionality
   */
  private deleteFlower(flower: Flower): void {
    // stash the flower code in browser's local storage for 'delete component' to retrieve later
    localStorage.removeItem("deleteFlowerCode");
    localStorage.setItem("deleteFlowerCode", flower.code);
    // browser console output
    console.log('Initiating DELETE request...');
    // invoke deleteFlower method from flower data service
    this.flowerService.deleteFlower(this.flower.code)
      .then(res => {
        // output to browser console (debugging)
        console.log('Delete request successful if API response is null...');
        console.log('API response: ' + res);
        // navigate
        this.router.navigate(['delete-flower']);
      });
  }

  /**
   * Method to toggle 'Edit' & 'Delete' buttons based on user login status
   */
  public isLoggedIn(): boolean {
    // check to see if user is logged in
    return this.authenticationService.isLoggedIn();
  }
}
