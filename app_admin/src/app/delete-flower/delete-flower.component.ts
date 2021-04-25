/**
 * Delete Flower component
 */

// import Angular modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-flower',
  templateUrl: './delete-flower.component.html',
  styleUrls: ['./delete-flower.component.css']
})

export class DeleteFlowerComponent implements OnInit {

  // retrieve stashed flowerCode for deleted flower
  flowerCode = localStorage.getItem("deleteFlowerCode");
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.flowerCode);
  }

  // method for admin page button navigation
  private adminPage(): void {
    this.router.navigate(['']);
  }
}
