import { Component, OnInit } from '@angular/core';
import { AdvertsService } from '../../services/advert.service';
import { Advert } from 'src/app/model/advert.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AdvertsService],
})
export class MainComponent implements OnInit{
  public adverts: Advert[]

  constructor(private _advertService: AdvertsService) {
  };

  ngOnInit(): void {
    this._advertService.getAdverts().subscribe(adverts => this.adverts = adverts) 
  };
};
