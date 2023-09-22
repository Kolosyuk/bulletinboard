import { Component, Input } from '@angular/core';
import { Card } from '../../model/card.interface';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
  ]
})
export class CardComponent {
  @Input() data: Card
 
}
