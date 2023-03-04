import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://picsum.photos/200';
  showImg = true;


  onLoaded(img:string){
    console.log('Image father loaded ok', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }
}
