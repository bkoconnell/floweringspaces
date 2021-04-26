/**
 * Authentication/Token Service Handler [client]
 * 
 * (facilitates saving and retrieving the JSON web token [jwt])
 */

// import Angular modules
import { Inject, Injectable } from '@angular/core';
// import models, services, and local storage object
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { FlowerDataService } from './flower-data.service';
import { BROWSER_STORAGE } from '../storage';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // constructor: define parameters to inject an instance within this class
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private flowerDataService: FlowerDataService
  ) { }

  /**
   * Method to retrieve token from local browser storage
   */
  public getToken(): string {
    return this.storage.getItem('fs-token');
  }

  /**
   * Method to save token to local browser storage after user registers or logs in
   */
  public saveToken(token: string): void {
    this.storage.setItem('fs-token', token);
  }

  /**
   * saveToken wrapper for the flowerDataService.login() method
   */
  public login(user: User): Promise<any> {
    return this.flowerDataService.login(user)
      // save token from auth response (after login) to local browser storage
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }

  /**
   * saveToken wrapper for the flowerDataService.register() method
   */
  public register(user: User): Promise<any> {
    return this.flowerDataService.register(user)
      // save token from auth response (after user registers) to local browser storage
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }

   /**
   * Method to logout user (deletes token from browser's local storage)
   */
  public logout(): void {
    this.storage.removeItem('fs-token');
    console.log('Logout successful ... Good bye!');
  }

  /**
   * Method to check user's login status
   */
  public isLoggedIn(): boolean {
    // retrieves token from local storage
    const token: string = this.getToken();
    // token exists (user is logged in)
    if (token) {
      // extract payload (from token), decode it, and parse into JSON
      const payload = JSON.parse(atob(token.split('.')[1]));
      // validate the expiration data & return the result
      return payload.exp > (Date.now() / 1000);
    }
    // token does not exist (user is not logged in)
    else {
      return false;
    }
  }

  /**
   * Method to extract user email & name from JWToken
   */
  public getCurrentUser(): User {
    // user is logged in
    if (this.isLoggedIn()) {
      // retrieve token from local storage
      const token: string = this.getToken();
      // extract payload (from token), decode it, and parse into JSON
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      // return data as User object
      return { email, name } as User;
    }
  }
}
