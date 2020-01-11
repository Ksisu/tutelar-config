import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HookData} from '../hook/hook.component';

@Component({
  selector: 'app-escher',
  templateUrl: './escher.component.html',
  styleUrls: ['./escher.component.css']
})
export class EscherComponent {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  credentialScope = 'eu/tutelar/request';
  authHeaderName = 'X-Escher-Auth';
  dateHeaderName = 'X-Escher-Date';
  algoPrefix = 'ESR';
  vendorKey = 'Escher';
  hostname = '';
  port = '';

  constructor() {
  }

  getValue() {
    return {
      credentialScope: this.credentialScope,
      authHeaderName: this.authHeaderName,
      dateHeaderName: this.dateHeaderName,
      algoPrefix: this.algoPrefix,
      vendorKey: this.vendorKey,
      hostname: this.hostname,
      port: this.port,
    };
  }

}
