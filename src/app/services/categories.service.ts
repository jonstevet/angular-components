import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) { }

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }



}
