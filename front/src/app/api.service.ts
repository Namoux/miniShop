import { Injectable } from '@angular/core';
import { Bracelet } from './interfaces/bracelet';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  public async getProducts() : Promise<Bracelet[]>{
    // return fetch("http://192.168.10.127:4004/../all-products/100")
    return fetch("http://localhost:4004/products/all")
    .then(res=>res.json());
  }
}
