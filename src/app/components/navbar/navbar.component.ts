import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeSideMenu = false;
  counterProductCart = 0;

  constructor(private storeService: StoreService) {
  }

  toggleSideMenu() {
    this.activeSideMenu = !this.activeSideMenu;
  }

  ngOnInit(): void {
    this.storeService.cartItemCount$.subscribe((data) => {
      console.log(data);
      this.counterProductCart = data.length;
    });

  }

}
