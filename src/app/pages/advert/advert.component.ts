import { Component, OnInit } from '@angular/core';
import { AdvertsService } from '../../services/advert.service';
import { Advert } from 'src/app/model/advert.interface';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { GalleriaResponsiveOptions } from 'primeng/galleria';
import { imageSrcCreator } from 'src/app/helpers/image-src-creator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss'],
})
export class AdvertComponent implements OnInit {
  public advert: Advert;
  private _id: number;
  public visible: boolean = false;
  public images: string[];
  public mapLink: string;
  public queryParams: Params;

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
  ];
  
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
          this.mapLink = `/advert/${this._id}/map`;
        })
      )
      .subscribe();
  };

  ngOnInit(): void {
   this._advertsService.getAdvertById(this._id)
   .subscribe({
      next: (advert) => {
        this.advert = advert;
        this.queryParams = {
          address : advert.location
        }
        if (this.advert.imagesIds.length) {
          this.images = this.advert.imagesIds.map((id) => imageSrcCreator(id));
        } else {
          this.images = [imageSrcCreator()];
        }
      },
      error:(errorResponse: HttpErrorResponse) => { 
        if (errorResponse.status === 404) {
          this._router.navigate(['/not-found']);
        } else {
          this._router.navigate([`/error-page`], {queryParams: { errorMessage: errorResponse.message }});
        }
      }
    });
  };

  showDialog(): void {
    this.visible = true
  };
};

