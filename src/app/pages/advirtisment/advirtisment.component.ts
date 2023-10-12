import { Component, OnInit } from '@angular/core';
import { AdvertsService } from '../../services/advert.service';
import { Advert } from 'src/app/model/advert.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { GalleriaResponsiveOptions } from 'primeng/galleria';
import { imageSrcCreator } from 'src/app/helpers/image-src-creator';


@Component({
  selector: 'app-advirtisment',
  templateUrl: './advirtisment.component.html',
  styleUrls: ['./advirtisment.component.scss'],
})
export class AdvirtismentComponent implements OnInit {
  public advert: Advert;
  private _id: number;
  public visible: boolean = false;
  public imageIds: Array<string>
  public mainImageId: string;
  public imageSrc: string;
  public images: string[];

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
      .pipe(
        filter(e => e instanceof NavigationEnd),
        tap( event => {
          this._id = this._activatedRoute.snapshot.params['id'];
        })
      )
      .subscribe();
  };

  ngOnInit(): void {
   this._advertsService.getAdvertById(this._id).pipe(
    tap(advert => {
      this.advert = advert;
      this.imageIds = this.advert.imagesIds;
      this.mainImageId = this.imageIds[0];
      this.imageSrc = imageSrcCreator(this.mainImageId)
      this.images = this.advert.imagesIds.map(imageSrcCreator);
      console.log(this.images)
    }),
   )
   .subscribe();
  }

  showDialog(): void {
    this.visible = true
  }

  valueChange(event: any) {
    console.log(event);
    
  }
}

