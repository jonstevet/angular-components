import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.models';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  cart: Product[] = [];
  cartTotal:number = 0;
  today = new Date();
  date = new Date(2022, 2, 26);

  products: Product[] = [];
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     price: 12000,
  //     img: 'https://picsum.photos/200'
  //   },
  //   {
  //     id: 2,
  //     name: 'Product 2',
  //     price: 12000,
  //     img: 'https://picsum.photos/200'
  //   },
  //   {
  //     id: 3,
  //     name: 'Product 3',
  //     price: 12000,
  //     img: 'https://picsum.photos/200'
  //   },
  //   {
  //     id: 4,
  //     name: 'Product 4',
  //     price: 12000,
  //     img: 'https://picsum.photos/200'
  //   }
  // ];

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService) {
    this.cart = this.storeService.getCart();
    // this.cartTotal = this.storeService.getTotalCostCart();
  }

  onAddedProduct(product: Product) {
    console.log(product);
    this.storeService.AddProductToCart(product);
    this.cartTotal = this.storeService.getTotalCostCart();
  }

  ngOnInit():void{
    this.productsService.getAllProducts()
    .subscribe((products) => {
      this.products = products;
    })
  }

}
