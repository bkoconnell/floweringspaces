/**
 * This is the frontend (client) service logic
 * for sending request methods to the API endpoint
 * and returning the response from the API endpoint
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

  // Build URL's for API and Endpoints
  private apiBaseUrl = 'http://localhost:3000/api/'; // API
  private flowerUrl = `${this.apiBaseUrl}flowers/`;  // API Endpoint (flowers collection)

  // method to add a flower to database through API
  public addFlower(formData: Flower): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#addFlower');
    // HTTP request & API response
    return this.http
      .post(this.flowerUrl, formData)                // POST call to API endpoint, pass form data as request body
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Success handler: return the promise response (new data object as seen in db)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to get a single flower
  public getFlower(flowerCode: string): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#getFlower(flowerCode)');
    // HTTP request & API response
    return this.http
      .get(this.flowerUrl + flowerCode)            // GET call to API endpoint w/ flower code parameter
      .toPromise()                                 // Convert observable response to a promise
      .then(response => response.json() as Flower) // Success handler: return the promise response (data object answering the request)
      .catch(this.handleError);                    // or, Error handler (invoke handleError method)
  }

  // method to return an array of flowers
  public getFlowers(): Promise<Flower[]> {
    // console output
    console.log('Inside FlowerDataService#getFlowers');
    // HTTP request & API response
    return this.http
      .get(this.flowerUrl)                           // GET call to API endpoint
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Success handler: return the promise response (data object answering the request)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to update a flower
  public updateFlower(formData: Flower): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#upateFlower');
    console.log(formData); // dump form data to console (debugging)
    // HTTP request & API response
    return this.http
      .put(this.flowerUrl + formData.code, formData) // PUT call to API endpoint w/ object data, pass flower code
      .toPromise()                                   // Convert observable response to a promise
      .then(response => response.json() as Flower[]) // Success handler: return the promise response (updated data object as seen in the db)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }


  // FIXME:  Add Delete method (comments for response: Null)


  // method to handle error
  private handleError(error: any): Promise<any> {
    // browser console output for rejected API request
    console.error('REQUEST FAILED: ', error);
    // return response to requester
    return Promise.reject(error.message || error);
  }
}