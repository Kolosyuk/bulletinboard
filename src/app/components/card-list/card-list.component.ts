import { Component, OnInit } from '@angular/core';
import { AdvertsService } from '../../services/advert.service';
import { Advert } from 'src/app/model/advert.interface';
import { CardComponent } from '../card/card.component';
import { NgForOf } from '@angular/common';
import { mergeMap, switchMap, forkJoin } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
  ],
})
export class CardListComponent implements OnInit {

  public adverts: Advert[];

  constructor(private _advertService: AdvertsService) {
  }

  ngOnInit(): void {
    this._advertService.getAdverts().pipe(
      // forkJoin(response => console.log(response))      
    ).subscribe()
  };


}
