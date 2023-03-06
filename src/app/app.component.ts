import { Component } from '@angular/core';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://picsum.photos/200';
  showImg = true;
  imgRta = '';

  constructor(
    private filesService: FilesService
  ){}


  onLoaded(img:string){
    console.log('Image father loaded ok', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }


  downloadFile(){
    this.filesService.getFile('text.txt', '../assets/public/text.txt', 'application/text')
    .subscribe(
      (res) => console.log('File downloaded ok', res),
      (err) => console.log('Error downloading file', err)
    )
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (!file) return
      this.filesService.uploadFile(file)
      .subscribe(res => {
        this.imgRta = res.location;
      });
  }


}
