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

  editForm: FormGroup; // an 'Edit Form'
  submitted = false;   // set Boolean

  // define constructor parameters (to inject an instance when class is instantiated)
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flowerService: FlowerDataService
  ) { }

  ngOnInit() {
    // retrieve stashed flowerId
    let flowerCode = localStorage.getItem("flowerCode");
    if (!flowerCode) {
      // cannot locate flower code
      alert("Failed to retrieve flowerCode from local browser storage. Navigating back to default page.");
      this.router.navigate(['']); // router navigates to default path
      return;
    }
    // console output for flower code found
    console.log('EditFlowerComponent#onInit found flowerCode ' + flowerCode);

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
    // console output to call getFlower()
    console.log('EditFlowerComponent#onInit calling FlowerDataService#getFlower(\'' + flowerCode + '\')');
    
    /**
     * NOTE: Best practice to call getFlower() method to retrieve the most recent data
     * prior to updating the database.
     */
    this.flowerService.getFlower(flowerCode) // call getFlower() service method, pass flower code
      .then(data => {
        // output data to console for dev. purposes
        console.log(data);      
        /**
         * NOTE: Don't use editForm.setValue() as it will throw console error.
         * Use patchValue() to match data w/ form values and populate the fields.
         */
        this.editForm.patchValue(data[0]);
      })
  }
  // user submission function ('Save' button)
  onSubmit() {
    this.submitted = true;
    // validate submission
    if (this.editForm.valid) {
      // invoke updateFlower method
      this.flowerService.updateFlower(this.editForm.value)
        .then(data => {
          console.log(data);          // output data to console for dev. purposes
          this.router.navigate(['']); // router navigates to default path
        });
    }
  }

}
