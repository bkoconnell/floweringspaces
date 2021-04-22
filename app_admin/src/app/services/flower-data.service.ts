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

  // URL's for API and Endpoints
  private apiBaseUrl = 'http://localhost:3000/api/'; // API
  private flowerUrl = `${this.apiBaseUrl}flowers/`;  // API Endpoint (flowers collection)

  // method to add a flower to database through API
  public addFlower(formData: Flower): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#addFlower');
    // return logic
    return this.http                                 // Use http module for .post() method below:
      .post(this.flowerUrl, formData)                // Send POST request to API endpoint
      .toPromise()                                   // Convert observable to promise
      .then(response => response.json() as Flower[]) // Success handler: return promise value (response: new data object as seen in db)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to get a single flower
  public getFlower(flowerCode: string): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#getFlower(flowerCode)');
    // return logic
    return this.http                               // Use http module for .get()
      .get(this.flowerUrl + flowerCode)            // Send GET request to API endpoint, pass flower code
      .toPromise()                                 // Convert observable to promise
      .then(response => response.json() as Flower) // Success handler: return promise value (response: data object answering the request)
      .catch(this.handleError);                    // or, Error handler (invoke handleError method)
  }

  // method to return an array of flowers
  public getFlowers(): Promise<Flower[]> {
    // console output
    console.log('Inside FlowerDataService#getFlowers');
    // return logic
    return this.http                                 // Use http module for .get()
      .get(this.flowerUrl)                           // Send GET request to API endpoint (for all collection documents)
      .toPromise()                                   // Convert observable to promise
      .then(response => response.json() as Flower[]) // Success handler: return promise value (response: data object answering the request)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to update a flower
  public updateFlower(formData: Flower): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#upateFlower');
    console.log(formData); // dump form data to console for dev. purposes
    // return logic
    return this.http                                 // Use http module for .put()
      .put(this.flowerUrl + formData.code, formData) // Send PUT request to API endpoint w/ object data, pass flower code
      .toPromise()                                   // Convert observable to promise
      .then(response => response.json() as Flower[]) // Success handler: return promise value (response: updated data object as seen in the db)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }


  // FIXME:  Add Delete method (comments for response: Null)


  // method to handle error
  private handleError(error: any): Promise<any> {
    // output to browser console for rejected API request
    console.error('REQUEST FAILED: ', error);
    // return response to component
    return Promise.reject(error.message || error);
  }
}