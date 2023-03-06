import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

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
    images: [],
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: ''
    },
    rating: {
      rate: 0,
      count: 0
    }
  }
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart() {
    this.addedProduct.emit(this.product)
    console.log('Add to cart');
  }

  onShowProductDetailChild() {
    console.log('Show product detail');
    this.showProduct.emit(this.product.id.toString());
  }

}
