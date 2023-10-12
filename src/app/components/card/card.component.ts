import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../model/advert.interface';
import { RouterModule } from '@angular/router';
import { imageSrcCreator } from '../../helpers/image-src-creator';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    CurrencyPipe
  ]
})
export class CardComponent implements OnInit {
  @Input() data: Advert
  public link: string;
  public mainImgSrc: string

  constructor() {}

  ngOnInit() {
    this.link = `/advert/${this.data.id}`;
    this.mainImgSrc = imageSrcCreator(this.data.imagesIds[0])
    console.log(this.data.id, this.mainImgSrc);
    
  }
}
