/**
 * Edit Flower component
 */

// import Angular modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import services
import { FlowerDataService } from '../services/flower-data.service';

@Component({
  selector: 'app-edit-flower',
  templateUrl: './edit-flower.component.html',
  styleUrls: ['./edit-flower.component.css']
})

export class EditFlowerComponent implements OnInit {

  editForm: FormGroup; // create an empty 'Edit Form'
  submitted = false;   // set Boolean for submit button

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flowerService: FlowerDataService
  ) { }

  ngOnInit() {

    // Retrieve stashed flower code
    let flowerCode = localStorage.getItem("editFlowerCode");

    // Alert if flower code retrieval Fails -- navigate back to flowers list
    if (!flowerCode) {
      alert("Failed to retrieve flowerCode from local browser storage. Navigating back to flowers list.");
      this.router.navigate(['list-flowers']);
      return;
    }

    /* Flower Code Retrieved Successfully */
    console.log('EditFlowerComponent#onInit found flowerCode ' + flowerCode); // browser console output

    // initialize edit form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [flowerCode, Validators.required],
      name: ['', Validators.required],
      scientific: ['', Validators.required],
      type: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })            
    /**
     * NOTE: Best practice to call getFlower() method to retrieve the most recent data
     * prior to updating the database.
     */
    this.flowerService.getFlower(flowerCode)
      // pass the retrieved data object
      .then(data => {
        // output data to browser console
        console.log(data);      
        /**
         * NOTE: Don't use editForm.setValue() as it will throw console error.
         * Use patchValue() to match data w/ form values and populate the fields.
         */
        this.editForm.patchValue(data[0]);
      })
  }

  /**
   * User submission function ('Save' button)
   */   
  onSubmit() {
    this.submitted = true;
    // validate submission
    if (this.editForm.valid) {
      // invoke updateFlower method & pass form data
      this.flowerService.updateFlower(this.editForm.value)
        // pass data object
        .then(data => {
          // output data to browser console & navigate back to flowers list
          console.log(data);
          this.router.navigate(['list-flowers']);
        });
    }
  }
}
