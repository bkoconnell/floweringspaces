/**
 * Add Flower component
 */

// import Angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
/**
 * Angular's 'forms' module allows code to access the data using "data binding":
 * The JavaScript variables are “bound” to the HTML form controls
 * with Angular’s forms library taking care of moving data
 * back and forth between the view (HTML) and the model (JavaScript).
 */

// import service
import { FlowerDataService } from '../services/flower-data.service';


@Component({
  selector: 'app-add-flower',
  templateUrl: './add-flower.component.html',
  styleUrls: ['./add-flower.component.css']
})

export class AddFlowerComponent implements OnInit {

  addForm: FormGroup; // an 'Add Form'
  submitted = false;  // set Boolean

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flowerService: FlowerDataService
  ) { }

  ngOnInit() {
    // setup a blank form on initialize
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      scientific: ['', Validators.required],
      type: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  // user submission function ('Save' button)
  onSubmit() {
    this.submitted = true;
    // validate submission
    if (this.addForm.valid) {
      // invoke addFlower method
      this.flowerService.addFlower(this.addForm.value)
        // pass response data
        .then(data => {
          // output to browser console
          console.log(data);
          // route back to flowers list
          this.router.navigate(['list-flowers']);
        });
    }
  }

  // get the form short-name to access the form fields
  get f() { return this.addForm.controls; }

}
