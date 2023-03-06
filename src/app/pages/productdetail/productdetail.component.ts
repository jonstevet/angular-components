import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  noImage = './assets/images/no_image.svg';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
        this.productId = params.get('id');
        if (this.productId){
          return this.productsService.getById(this.productId);
        }
        return [null];
      })
    )
    .subscribe(data => {
      this.product = data;
    });
  }

  productDetailBack(){
    this.location.back();
  }



}
