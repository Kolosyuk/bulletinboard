import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YamapsDTO } from 'src/app/model/yamaps.interface';
import { YamapsService } from 'src/app/services/yamaps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public address: string;
  public longitude: number;
  public latitude: number;
  public noAddress: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _yamaps: YamapsService
  ) {
    this.address = this._activatedRoute.snapshot.queryParams['address'];
  };

  ngOnInit() {
    this._yamaps.decodeCoordinates(this.address).subscribe((res: YamapsDTO) => {
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
};