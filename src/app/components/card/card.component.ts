import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../model/advert.interface';
import { RouterModule } from '@angular/router';
import { imageSrcCreator } from '../../helpers/image-src-creator';
import { ImageService } from '../../services/image.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DatePipe
  ]
})
export class CardComponent implements OnInit {
  @Input() data: Advert
  public link: string;
  public mainImgSrc: string

  constructor(
    private _imageService: ImageService
  ) {}

  ngOnInit() {
    this.link = `/advert/${this.data.id}`;
    this._imageService.getImage(this.data.imagesIds[0])
    .subscribe(image => {
      this.mainImgSrc = imageSrcCreator(image.content);
    }
    );
  }
}
