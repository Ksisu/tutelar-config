import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BasicData} from '../hook-basic/hook-basic.component';

export interface HookData {
  enabled: boolean;
  type?: string;
  data?: BasicData;
}

@Component({
  selector: 'app-hook',
  templateUrl: './hook.component.html',
  styleUrls: ['./hook.component.css']
})
export class HookComponent {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Output() changed = new EventEmitter<any>();

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

  constructor() {
  }

  enabledHooksChanged() {
    this.enabled = this.hooks.filter(h => h.selected).length > 0;
    this.changed.emit({});
  }

  getValue() {
    if (!this.enabled) {
      return {enabled: false};
    } else {
      const enabledHooks = this.hooks.filter(h => h.selected).map(h => h.id);
      switch (this.authType) {
        case 'basic':
          return {
            enabled: true,
            baseUrl: this.baseUrl,
            enabledHooks,
            type: this.authType,
            data: this.basicData
          };
        case 'escher':
          return {
            enabled: true,
            baseUrl: this.baseUrl,
            enabledHooks,
            type: this.authType,
          };
        case 'jwt':
          return {
            enabled: true,
            baseUrl: this.baseUrl,
            enabledHooks,
            type: this.authType
          };
        default:
          return {enabled: false};
      }
    }
  }

}
