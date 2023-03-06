import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { retry } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit():void{
    this.productsService.getBySegment(10, 0)
    .pipe(retry(3)) // retry 3 times conecting to the server
    .subscribe((products) => {
      this.products = products;
    });
    this.route.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
  }

  onLoadMore() {
    this.offset += this.limit;
    this.productsService.getBySegment(this.limit, this.offset)
    .subscribe((products) => {
      this.products = this.products.concat(products);
    });
  }






}
