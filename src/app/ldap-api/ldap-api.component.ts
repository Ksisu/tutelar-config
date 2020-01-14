import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-ldap-api',
  templateUrl: './ldap-api.component.html',
  styleUrls: ['./ldap-api.component.css']
})
export class LdapApiComponent {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  enabled = false;
  authType = 'basic';

  basic = {
    username: '',
    password: {from: 'file', value: ''}
  };

  constructor() {
  }

  getValue() {
    if (!this.enabled) {
      return {enabled: this.enabled};
    }

    switch (this.authType) {
      case 'basic':
        return {enabled: this.enabled, authType: this.authType, basic: this.basic};
      case 'jwt':
        return {enabled: this.enabled, authType: this.authType};
      case 'escher':
        return {enabled: this.enabled, authType: this.authType};
    }
  }

}
