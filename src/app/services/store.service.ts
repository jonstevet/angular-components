import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<Product[]>([]);

  cartItemCount$ = this.cartItemCount.asObservable();

  getCart() {
    return this.cart;
  }

  AddProductToCart(product: Product) {
    this.cart.push(product);
    this.cartItemCount.next(this.cart);
  }

  RemoveProductToCart(product: Product) {
    this.cart = this.cart.filter(p => p.id !== product.id);
  }

  getTotalCostCart() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}
