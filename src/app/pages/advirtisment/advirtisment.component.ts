import { Component, OnInit } from '@angular/core';
import { AdvertsService } from '../../services/advert.service';
import { Advert } from 'src/app/model/advert.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { GalleriaResponsiveOptions } from 'primeng/galleria';


@Component({
  selector: 'app-advirtisment',
  templateUrl: './advirtisment.component.html',
  styleUrls: ['./advirtisment.component.scss'],
})
export class AdvirtismentComponent implements OnInit {
  public advert: Advert;
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
    private _advertsService: AdvertsService,
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
   this._advertsService.getAdvertById(this._id)
   .subscribe(advert => {
    this.advert = advert;
     this.images = this.advert.imagesIds;
     console.log(this.images);
    }
   );
  }
}

