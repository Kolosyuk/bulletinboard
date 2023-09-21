import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Card } from '../../model/card.interface';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
  ]
})
export class CardComponent {
  @Input() data: Card

}
