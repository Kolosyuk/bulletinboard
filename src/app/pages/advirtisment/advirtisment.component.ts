import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from 'src/app/model/card.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { GalleriaResponsiveOptions } from 'primeng/galleria';


@Component({
  selector: 'app-advirtisment',
  templateUrl: './advirtisment.component.html',
  styleUrls: ['./advirtisment.component.scss'],
})
export class AdvirtismentComponent implements OnInit {
  public card: Card;
  private _id: number;
  public images: Array<string>;

  public responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
  ]

  
  constructor(
    private _cardsService: CardsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
      this._router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() =>
      this._id = +this._activatedRoute.snapshot.params['id']
        )
  };

  ngOnInit(): void {
   this._cardsService.getCardById(this._id)
   .subscribe(card => {
     this.card = card[0];
     this.images = this.card.images;
     console.log(this.images);
    }
   );
  }
}

