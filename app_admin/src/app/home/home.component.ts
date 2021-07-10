/**
 * Home component for Login
 */

// import Angular modules
import { Component, OnInit } from '@angular/core';
// import services
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  /**
   * Method to check user login status
   */ 
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}