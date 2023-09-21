import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [CardsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

}
