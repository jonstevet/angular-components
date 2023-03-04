import { Injectable } from '@angular/core';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private cart: Product[] = [];

  constructor() { }

  getCart() {
    return this.cart;
  }

  AddProductToCart(product: Product) {
    this.cart.push(product);
  }

  RemoveProductToCart(product: Product) {
    this.cart = this.cart.filter(p => p.id !== product.id);
  }

  getTotalCostCart() {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}
