import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(
  ){}

  showSuccess(instance: MessageService, msg:string) {
    instance.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  showInfo(instance: MessageService, msg:string) {
    instance.add({ severity: 'info', summary: 'Info', detail: msg });
  }

  showWarn(instance: MessageService, msg:string) {
    instance.add({ severity: 'warn', summary: 'Warn', detail: msg });
  }

  showError(msg:string, instance: MessageService) {
    console.log(instance);
    
    instance.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
