import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../model/advert.interface';
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
export class CardComponent implements OnInit {
  @Input() data: Advert
  public link: string;

  ngOnInit() {
    this.link = `/advert/${this.data.id}`
  }
}
