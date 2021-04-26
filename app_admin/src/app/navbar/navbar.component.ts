/**
 * Navigation Bar component
 */

// import Angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import services
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() { }

  // method to toggle condition for html Login/Logout button
  public isLoggedIn(): boolean {
    // check to see if user is logged in
    return this.authenticationService.isLoggedIn();
  }

  // method to initiate logout (triggered when the user clicks the 'logout' button)
  private onLogout(): void {
    this.authenticationService.logout();
    // navigates to specified URL path
    this.router.navigateByUrl('#');
    return;
  }

}