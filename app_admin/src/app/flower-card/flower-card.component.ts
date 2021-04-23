// import Angular modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import models
import { Flower } from '../models/flower';
import { FlowerDataService } from '../services/flower-data.service';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.css']
})
export class FlowerCardComponent implements OnInit {

  @Input('flower') flower: Flower;

  submitted = false;   // set Boolean for Delete button

  // define constructor parameters (to inject an instance when class is instantiated)
  constructor(
    private router: Router,
    private flowerService: FlowerDataService
  ) { }

  ngOnInit() {
  }

  // method for edit-flower button navigation
  private editFlower(flower: Flower): void {
    // stash the flower code in browser's local storage for the 'edit component' to retrieve later
    localStorage.removeItem("editFlowerCode");
    localStorage.setItem("editFlowerCode", flower.code);
    this.router.navigate(['edit-flower']);  // router navigates to edit-flower path
  }

  // method for delete-flower button
  private deleteFlower(flower: Flower): void {
    // stash the flower code in browser's local storage for the 'delete component' to retrieve later
    localStorage.removeItem("deleteFlowerCode");
    localStorage.setItem("deleteFlowerCode", flower.code);
    // browser console output
    console.log('Initiating DELETE request...');

    // invoke deleteFlower method from flower data service
    this.flowerService.deleteFlower(this.flower.code)
      .then(res => {
        // debugging output to browser console
        console.log('Delete request successful if API response is null...');
        console.log('API response: ' + res);

        this.router.navigate(['delete-flower']); // router navigates to delete-flower path
      });
  }
}
