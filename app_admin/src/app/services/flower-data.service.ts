// import Angular modules
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import the model that defines a Flower instance in the JSON
import { Flower } from '../models/flower';

@Injectable()
export class FlowerDataService {

  // define constructor parameters (to inject an instance when class is instantiated)
  constructor(private http: Http) { }

  // URL variables
  private apiBaseUrl = 'http://localhost:3000/api/'; // API
  private flowerUrl = `${this.apiBaseUrl}flowers/`;  // flowers collection

  // method to add a flower to database through API
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

  // method to get a single flower
  public getFlower(flowerCode: string): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#getFlower(flowerCode)');
    // return logic
    return this.http                                // Use http module for .get()
      .get(this.flowerUrl + flowerCode)             // Evaluate URL w/ flower code for retrieval
      .toPromise()                                  // Convert observable to promise
      .then(response => response.json() as Flower)  // Success handler: return promise value (response)
      .catch(this.handleError);                     // or, Error handler (invoke handleError method)
  }

  // method to return an array of flowers
  public getFlowers(): Promise<Flower[]> {
    // console output
    console.log('Inside FlowerDataService#getFlowers');
    // return logic
    return this.http                                 // Use http module for .get()
      .get(this.flowerUrl)                           // Evaluate URL
      .toPromise()                                   // Convert observable to promise
      .then(response => response.json() as Flower[]) // Success handler: return promise value (response)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to update a flower
  public updateFlower(formData: Flower): Promise<Flower> {
    // console output
    console.log('Inside FlowerDataService#upateFlower');
    console.log(formData); // dump form data to console for dev. purposes
    // return logic
    return this.http                                 // Use http module for .put()
      .put(this.flowerUrl + formData.code, formData) // Evaluate URL w/ code & pass form data in request body
      .toPromise()                                   // Convert observable to promise
      .then(response => response.json() as Flower[]) // Success handler: return promise value (response)
      .catch(this.handleError);                      // or, Error handler (invoke handleError method)
  }

  // method to handle error
  private handleError(error: any): Promise<any> {
    // FIXME: Replace with more appropriate console error message content (current message is for demo purposes)
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}