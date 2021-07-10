/**
 * API Call Service Handler [client]]
 * 
 * (facilitates sending HTTP calls to REST API endpoint
 *  and returns the API's response back to the requester)
 */

// import Angular modules
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
// import models & local storage object
import { Flower } from '../models/flower';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';


@Injectable()
export class FlowerDataService {

  // constructor: define parameters to inject an instance within this class
  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  // Build URL's for REST API and API Endpoint
  private apiBaseUrl = 'http://localhost:3000/api/'; // REST API
  private flowerUrl = `${this.apiBaseUrl}flowers/`;  // API Endpoint (flowers collection)

  /**
   * Method to send POST call to API
   * (add a new flower to db.collection)
   */
  public addFlower(formData: Flower): Promise<Flower> {

    // browser console output
    console.log('Inside FlowerDataService#addFlower');

    // logic for HTTP request & API response handling
    return this.http
      .post(this.flowerUrl, formData)                // POST call to API w/ request body (form data)
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return (new data object as seen in db)
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }

  /**
   * Method to send GET call to API
   * (read a single flower by code)
   */
  public getFlower(flowerCode: string): Promise<Flower> {

    // browser console output
    console.log('Inside FlowerDataService#getFlower(flowerCode)');

    // logic for HTTP call & API response handling
    return this.http
      .get(this.flowerUrl + flowerCode)            // GET call to API w/ URL parameter (flower code)
      .toPromise()                                 // Convert observable response to a promise
      .then(response => response.json() as Flower) // Set promise response to single instance for return (data object answering the request)
      .catch(this.handleError);                    // Error handler (invoke handleError method)
  }

  /**
   * Method to send GET call to API
   * (read all flowers in db.collection)
   */
  public getFlowers(): Promise<Flower[]> {

    // browser console output
    console.log('Inside FlowerDataService#getFlowers');

    // logic for HTTP request & API response handling
    return this.http
      .get(this.flowerUrl)                           // GET call to API
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return (data object answering the request)
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }

  /**
   * Method to send PUT call to API
   * (update a single flower by code)
   */
  public updateFlower(formData: Flower): Promise<Flower> {

    // browser console output
    console.log('Inside FlowerDataService#updateFlower...' + formData);

    // logic for HTTP request & API response handling
    return this.http
      .put(this.flowerUrl + formData.code, formData) // PUT call to API w/ URL parameter (flower code) & request body (form data)
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return (updated data object as seen in the db)
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }

 /**
  * Method to send DELETE call to API
  * (delete a single flower by code)
  */
  public deleteFlower(flowerCode: string): Promise<Flower> {

    // browser console output
    console.log('Inside FlowerDataService#deleteFlower');
    
    // logic for HTTP request call & API response handling
    return this.http
      .delete(this.flowerUrl + flowerCode)           // DELETE call to API w/ URL parameter (flower code)
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return(empty array)
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }

  /**
   * Method to Handle Error Response from API
   */
  private handleError(error: any): Promise<any> {

    // browser console output for rejected API request
    console.error('REQUEST FAILED: ', error);

    // return response to requester
    return Promise.reject(error.message || error);
  }

  /**
   * Method to pass Login request
   */
  public login(user: User): Promise<Authresponse> {
    // pass endpoint path & user object to AuthApiCall method
    return this.makeAuthApiCall('login', user);
  }

  /**
   * Method to pass Register New User request
   */
  public register(user: User): Promise<Authresponse> {
    // pass endpoint path & user object to AuthApiCall method
    return this.makeAuthApiCall('register', user);
  }

  /**
   * Method to make Authentication API Call
   */
  private makeAuthApiCall(urlPath: string, user: User): Promise<Authresponse> { 
    
    // browser console output
    console.log('Sending HTTP request to API');

    // API endpoint
    const url: string = `${this.apiBaseUrl}${urlPath}`;
    
    // logic for HTTP request call & API response handling
    return this.http
      .post(url, user)                                   // POST call to API w/ URL parameter & request body (payload->[user details])
      .toPromise()                                       // Convert observable response to a promise
      .then(response => response.json() as Authresponse) // Set promise response to single instance for return(Authresponse object)
      .catch(this.handleError);                          // Error handler (invoke handleError method)
  }
}