import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Product, NewProduct, UpdateProduct } from '../models/product.model';
import { checkTime } from '../../app/interceptor/time.interceptor';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api';

  constructor( private http: HttpClient ) { }

  getAll() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        if (error.status === HttpStatusCode.Conflict) return throwError('Algo esta fallando en el servidor');
        if (error.status === HttpStatusCode.NotFound) return throwError('El producto no existe');
        if (error.status === HttpStatusCode.Unauthorized) return throwError('no tienes permisos suficientes');
        return throwError('Algo esta fallando');
      })
    )
  }

  create(data: NewProduct){
    return this.http.post<Product>(`${this.apiUrl}/products`, data);
  }

  update(id: number, data: UpdateProduct){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data);
  }

  delete(id: number){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  getBySegment(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: { limit, offset }, context: checkTime()
    });
  }

  getByCategory(id: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${id}/products`, { params });
  }

}
