import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from '../../services/modal.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(public modalService: ModalService) {}

}
