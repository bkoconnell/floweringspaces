// import Angular modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import models
import { Flower } from '../models/flower';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.css']
})
export class FlowerCardComponent implements OnInit {

  @Input('flower') flower: Flower;

  // define constructor parameters (to inject an instance when class is instantiated)
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  // method for edit-flower navigation
  private editFlower(flower: Flower): void {
    // stash the flower code in browser's local storage for the 'edit component' to retrieve later
    localStorage.removeItem("flowerCode");
    localStorage.setItem("flowerCode", flower.code);
    this.router.navigate(['edit-flower']);  // router navigates to edit-flower path
  }  

  // method to invoke deleteFlower service
  private deleteFlower(flower: Flower): void {
    // stash the flower code in browser's local storage for the 'delete component' to retrieve later
    localStorage.removeItem("flowerCode");
    localStorage.setItem("flowerCode", flower.code);
    this.router.navigate(['delete-flower']);  // router navigates to delete-flower path
  }  
}
