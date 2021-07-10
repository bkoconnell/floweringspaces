/**
 * Register controller (frontend / client)
 * for new users
 */

// import Angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import angular services & models
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // initialize variable for form error
  public formError: string = '';

  // initialize credentials object for model data
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

  /**
   *  Method to handle conditions when login button is clicked
   */
  public onRegisterSubmit(): void {

    // reset formError
    this.formError = '';

    // missing credentials --> error
    if (!this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password) {
      // output error message
      console.log('Missing credentials');
      this.formError = 'All fields are required, please try again';
    }
    // call doRegister() method if all credentials are entered
    else {
      this.doRegister();
    }
  }

  /**
   * Method to Register user
   */
  private doRegister(): void {
    // call auth service 'register' method & pass credentials
    this.authenticationService.register(this.credentials)
      // route to flowers list if register is successful, otherwise handle errors
      .then(() => this.router.navigateByUrl('list-flowers'))
      .catch((message) => this.formError = message);
  }

}
