// import Angular modules
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// import the model that defines a Flower instance in the JSON
import { Flower } from '../models/flower';

@Injectable()
export class FlowerDataService {

  constructor(private http: Http) { } // receive in Http module, assigned to http

  private apiBaseUrl = 'http://localhost:3000/api/';  // assignment for API URL

  // method to return an array of flowers
  public getFlowers(): Promise<Flower[]> {
    // console output
    console.log('Inside FlowerDataService#getFlowers');
    // return logic
    return this.http                                // Use http module for .get() method below:
      .get(`${this.apiBaseUrl}flowers`)               // Evaluate templated string (http://localhost:3000/flowers)
      .toPromise()                                  // Send response to Promise
      .then(response => response.json() as Flower[])  // Response will be array of flowers
      .catch(this.handleError);                     // Call method to handle errors
  }

  // method to handle error
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}