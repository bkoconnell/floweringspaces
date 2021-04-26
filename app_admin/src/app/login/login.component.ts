/**
 * Login controller (frontend / client)
 */

// import Angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import angular services & models
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // initialize variable for form error
  public formError: string = '';
  // initialize credentials object
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
  public onLoginSubmit(): void {
    this.formError = '';
    // missing credentials - error
    if (!this.credentials.email || !this.credentials.password) {
      console.log('Missing credentials');
      this.formError = 'All fields are required, please try again';
    }
    // call doLogin() method if all credentials are entered
    else {
      this.doLogin();
    }
  }

  /**
   * Method for user login
   */
  private doLogin(): void {
    // call auth service 'login' method & pass credentials
    this.authenticationService.login(this.credentials)
      // route to flowers list & handle errors
      .then(() => this.router.navigateByUrl(''))
      .catch((message) => this.formError = message);
  }
}