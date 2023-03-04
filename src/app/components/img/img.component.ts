import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  image: string = '';
  @Input('img') set changeImg(newImg: string){
    this.image = newImg;
    //code
    console.log('change img =>', this.image)
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  noImage = './assets/images/no_image.svg';
  // counter = 0;
  // counterFn: number | undefined;


  constructor() {
    //before render
    //NO Async -- run only once time
    console.log('Constructor', 'imgValue =>', this.image);
  }


  imgError(){
    this.image = this.noImage;
  }

  imgLoaded(){
    console.log('Image child loaded ok');
    this.loaded.emit(this.image);
  }

  ngOnChanges(changes: SimpleChanges){
    //before render
    //update inputs - run multiple times
    console.log('ngOnChanges', 'imgValue =>', this.image);
    console.log('ngOnChanges', changes);
  }

  ngOnInit(): void{
    //before render
    //Async - fetch - call apis,  run only once time
    console.log('ngOnInit', 'imgValue =>', this.image);
    // this.counterFn = window.setInterval(() => {
    //   this.counter++;
    //   console.log('counter');
    // }, 1000);
  }

  ngAfterViewInit(){
    //after render
    //handler children
    //Async - fetch - call apis,  run only once time
    console.log('AfterViewInit');
  }

  ngOnDestroy(){
    //delete component
    console.log('OnDestroy');
    //window.clearInterval(this.counterFn);
  }

}
