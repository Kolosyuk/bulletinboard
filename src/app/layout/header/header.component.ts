import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public modalService: ModalService) {}

}
