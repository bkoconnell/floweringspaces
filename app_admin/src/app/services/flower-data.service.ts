/**
 * This is the frontend (client) service logic
 * for sending HTTP requests (method calls) to the REST API endpoint
 * and returning the API's response to the requester
 */


// import Angular modules
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import the model that defines a Flower instance in the JSON
import { Flower } from '../models/flower';


@Injectable()
export class FlowerDataService {

  // define constructor parameters (to inject an instance when class is instantiated)
  constructor(private http: Http) { }

  // Build URL's for REST API and API Endpoint
  private apiBaseUrl = 'http://localhost:3000/api/'; // REST API
  private flowerUrl = `${this.apiBaseUrl}flowers/`;  // API Endpoint (flowers collection)

  // method to add a flower to database through API
  public addFlower(formData: Flower): Promise<Flower> {
    // browser console output
    console.log('Inside FlowerDataService#addFlower');
    // logic for HTTP request call & API response handling
    return this.http
      .post(this.flowerUrl, formData)                // POST call to API w/ request body (form data)
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return (new data object as seen in db)
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }

  // method to get a single flower
  public getFlower(flowerCode: string): Promise<Flower> {
    // browser console output
    console.log('Inside FlowerDataService#getFlower(flowerCode)');
    // logic for HTTP request call & API response handling
    return this.http
      .get(this.flowerUrl + flowerCode)            // GET call to API w/ URL parameter (flower code)
      .toPromise()                                 // Convert observable response to a promise
      .then(response => response.json() as Flower) // Set promise response to single instance for return (data object answering the request)
      .catch(this.handleError);                    // Error handler (invoke handleError method)
  }

  // method to return an array of flowers
  public getFlowers(): Promise<Flower[]> {
    // browser console output
    console.log('Inside FlowerDataService#getFlowers');
    // logic for HTTP request call & API response handling
    return this.http
      .get(this.flowerUrl)                           // GET call to API
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return (data object answering the request)
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }

  // method to update a flower
  public updateFlower(formData: Flower): Promise<Flower> {
    // browser console output
    console.log('Inside FlowerDataService#updateFlower');
    console.log(formData); // dump form data to browser console (debugging)
    // logic for HTTP request call & API response handling
    return this.http
      .put(this.flowerUrl + formData.code, formData) // PUT call to API w/ URL parameter (flower code) & request body (form data)
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return (updated data object as seen in the db)
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }


  // FIXME:  Add Delete method (comments for response: Null)
  // method to delete a flower
  public deleteFlower(flowerCode: string): Promise<Flower> {
    // browser console output
    console.log('Inside FlowerDataService#deleteFlower');
    // logic for HTTP request call & API response handling
    return this.http
      .delete(this.flowerUrl + flowerCode)           // DELETE call to API w/ URL parameter (flower code)
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Set promise response to single instance for return ()
      .catch(this.handleError);                      // Error handler (invoke handleError method)
  }


  // method to handle error
  private handleError(error: any): Promise<any> {
    // browser console output for rejected API request
    console.error('REQUEST FAILED: ', error);
    // return response to requester
    return Promise.reject(error.message || error);
  }
}