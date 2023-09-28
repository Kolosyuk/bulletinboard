import { Component } from '@angular/core';
import { AdvertsService } from '../../services/advert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AdvertsService],
})
export class MainComponent {

}
