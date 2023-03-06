import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, NewProduct, UpdateProduct } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {
  cart: Product[] = [];
  cartTotal = 0;
  today = new Date();
  date = new Date(2022, 2, 26);
  showProductDetail = false;
  @Output() loadMore = new EventEmitter();
  //@Input() productId: string | null = null;
  @Input()
  set productId(id: string | null){
    if(id){
      this.showProductDetail = true;
        this.onShowProductDetail(id);
    }
  }

  productToShow: Product = {
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

  @Input() products: Product[] = [];
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


  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowProductDetail(id:string){
    if ( !this.showProductDetail ) this.showProductDetail = true;
    this.productsService.getById(id).subscribe((product) => {
      console.log('Product= ', product);
      this.productToShow = product;
    })
  }

  createNewProduct(){
    const newProduct: NewProduct = {
      title: 'Jonathan Torres',
      price: 1000000,
      images: ['https://picsum.photos/400'],
      description: 'Saludos, este es mi producto de prueba',
      categoryId: 1
    };

    this.productsService.create(newProduct).subscribe((product) => {
      console.log('Product created= ', product);
      this.products.push(product);
    })

  }

  updateProduct(){
    const changes: UpdateProduct = {
      title: 'producto editado',
      price: 12000
    };

    const id = this.productToShow.id;

    this.productsService.update(id, changes).subscribe((product) => {
      console.log('Product updated= ', product);
      const index = this.products.findIndex((p) => p.id === product.id);
      this.products[index] = product;
      this.productToShow = product;
    })
  }

  deleteProduct(){
    const id = this.productToShow.id;

    this.productsService.delete(id).subscribe((product) => {
      console.log('Product deleted= ', product);
      const index = this.products.findIndex((p) => p.id === this.productToShow.id);
      this.products.splice(index, 1);
      this.showProductDetail = false;
    })
  }

  loadMoreProducts() {
    this.loadMore.emit();
  }




}
