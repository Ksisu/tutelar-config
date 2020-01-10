import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasicData} from '../hook-basic/hook-basic.component';
import {EscherClientData} from '../hook-escher/hook-escher.component';

export interface HookData {
  enabled: boolean;
  type?: string;
  data?: BasicData | EscherClientData;
}

@Component({
  selector: 'app-hook',
  templateUrl: './hook.component.html',
  styleUrls: ['./hook.component.css']
})
export class HookComponent implements OnInit {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Input()
  set value(value: HookData) {
    if (!!value) {
      this.enabled = value.enabled;
      if (this.enabled) {
        switch (value.type) {
          case 'basic':
            // @ts-ignore
            this.basicData = value.data;
            break;
          case 'escher':
            // @ts-ignore
            this.escherData = value.data;
            break;
          default:
        }
      }
    }
  }

  @Output() valueChange = new EventEmitter<HookData>();

  enabled = false;
  hooks = [
    {id: 'register', label: 'Register', selected: false},
    {id: 'login', label: 'Login', selected: false},
    {id: 'modify', label: 'Modify', selected: false},
    {id: 'link', label: 'Link', selected: false},
    {id: 'unlink', label: 'Unlink', selected: false},
    {id: 'delete', label: 'Delete', selected: false},
    {id: 'refresh', label: 'Token refresh', selected: false},
  ];

  baseUrl = 'https://';

  authType = 'basic';
  basicData = {
    username: '',
    password: {from: 'file', value: ''},
  };
  escherData = {
    key: '',
    secret: {from: 'file', value: ''},
    scope: 'eu/tutelar/request',
  };

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    if (!this.enabled) {
      this.valueChange.emit({enabled: false});
    } else {
      switch (this.authType) {
        case 'basic':
          this.valueChange.emit({enabled: true, type: this.authType, data: this.basicData});
          break;
        case 'escher':
          this.valueChange.emit({enabled: true, type: this.authType, data: this.escherData});
          break;
        default:
          this.valueChange.emit({enabled: false});
      }
    }
  }

}
