// import Angular modules
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import the model that defines a Flower instance in the JSON
import { Flower } from '../models/flower';

@Injectable()
export class FlowerDataService {

  // constructor: define parameters to inject an instance within this class
  constructor(private http: Http) { }

  // URL variables
  private apiBaseUrl = 'http://localhost:3000/api/';
  private flowerUrl = `${this.apiBaseUrl}flowers/`;

  // method to add a flower
  public addFlower(formData: Flower): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#addFlower');
    // return logic
    return this.http                                 // Use http module for .post() method below:
      .post(this.flowerUrl, formData)                // Pass form data in request body
      .toPromise()                                   // Convert observable to promise
      .then(response => response.json() as Flower[]) // Success handler: return promise value (response)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to return an array of flowers
  public getFlowers(): Promise<Flower[]> {
    // console output
    console.log('Inside FlowerDataService#getFlowers');
    // return logic
    return this.http                                 // Use http module for .get() method below:
      .get(this.flowerUrl)                           // Evaluate URL
      .toPromise()                                   // Convert observable to promise
      .then(response => response.json() as Flower[]) // Success handler: return promise value (response)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to handle error
  private handleError(error: any): Promise<any> {
    // FIXME: Replace with more appropriate console error message
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}