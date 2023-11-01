import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { YamapsDTO } from 'src/app/model/yamaps.interface';
import { YamapsService } from 'src/app/services/yamaps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  public address: string;
  public longitude: number;
  public latitude: number;
  public noAddress: boolean;
  private destroy$ = new Subject();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _yamaps: YamapsService
  ) {
    this.address = this._activatedRoute.snapshot.queryParams['address'];
  };

  ngOnInit() {
    this._yamaps.decodeCoordinates(this.address).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((res: YamapsDTO) => {
      let long = '';
      let lat = '';
      const found:number = Number(res.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found);
      if(found > 0) {
        [long, lat] = res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
        this.longitude = Number(long);
        this.latitude = Number(lat);
      } else {
        this.noAddress = true
      };
    });
  };

  ngOnDestroy(): void {
      this.destroy$.next('stop');
      this.destroy$.complete;
  }
};