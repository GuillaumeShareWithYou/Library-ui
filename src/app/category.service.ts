import { Injectable } from '@angular/core';
import {Category} from "./entity/Category";

@Injectable()
export class CategoryService {
  baseUrl : string;
  constructor() {
    this.baseUrl = 'http://localhost:8080/api/category';
  }

  getAll() : Promise<Response> {
    return fetch(this.baseUrl);
  }
}
