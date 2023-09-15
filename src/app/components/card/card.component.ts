import { Component, Input } from '@angular/core';
import { Card } from '../../model/card.interface';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,

})
export class CardComponent {
  @Input() data: Card

}
