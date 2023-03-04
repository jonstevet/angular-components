import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product:Product = {
    id: 0,
    title: '',
    price: 0,
    image: '',
    description: '',
    category: '',
    rating: {
      rate: 0,
      count: 0
    }
  }
  @Output() addedProduct = new EventEmitter<Product>();

  onAddToCart() {
    this.addedProduct.emit(this.product)
    console.log('Add to cart');
  }

}
