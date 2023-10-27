import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-new-adv',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './card-new-adv.component.html',
  styleUrls: ['./card-new-adv.component.scss']
})
export class CardNewAdvComponent {

};