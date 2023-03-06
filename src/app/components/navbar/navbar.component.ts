import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import { CategoriesService } from '../../services/categories.service';
import { User } from '../../models/user.model';
import { Category } from '../../models/product.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeSideMenu = false;
  counterProductCart = 0;
  isLogged = false;
  currentUser:User | null = {
    id: 0,
    email: '',
    name: '',
    password: ''
  };
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private categoriesService: CategoriesService
    ) {
  }

  toggleSideMenu() {
    this.activeSideMenu = !this.activeSideMenu;
  }

  ngOnInit(): void {
    this.storeService.cartItemCount$.subscribe((data) => {
      console.log(data);
      this.counterProductCart = data.length;
      this.isKnowUser();
      this.getCategoriesList();
    });
  }

  createUser(){
    this.usersService.create({
      name: 'Jonathan Torres',
      email: 'jonsteve@correo.com',
      password: '123456'
    })
    .subscribe( user => {
      console.log('User created', user);
    });
  }

  login(){
    this.authService.loginAndProfile('jonsteve@correo.com', '123456')
    .subscribe( user => {
      console.log('User logged', user);
      this.currentUser = user;
      this.isLogged = true;
    });
  }

  isKnowUser(){
    if(this.tokenService.getToken()){
      this.authService.getProfile()
      .subscribe( user => {
        console.log('User know', user.name);
        this.currentUser = user;
        this.isLogged = true;
      });
    } else {
      console.log('no cookie');
    }
  }

  getCategoriesList(){
    this.categoriesService.getCategories()
    .subscribe( data => {
      console.log('Categories ', data);
      this.categories = data;
    });
  }

}
