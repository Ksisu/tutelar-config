import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ldap',
  templateUrl: './ldap.component.html',
  styleUrls: ['./ldap.component.css']
})
export class LdapComponent {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  url = 'ldap://localhost:389';
  user = 'cn=readonly,dc=wanari,dc=com';
  password = {from: 'file', value: ''};
  baseDomain = 'ou=users,dc=wanari,dc=com';
  searchAttribute = 'cn';
  singleReturnAttribute = 'cn,sn,givenName';
  multipleReturnAttribute = 'memberof';

  constructor() {
  }

  getValue() {
    return {
      url: this.url,
      user: this.user,
      password: this.password,
      baseDomain: this.baseDomain,
      searchAttribute: this.searchAttribute,
      singleReturnAttribute: this.singleReturnAttribute,
      multipleReturnAttribute: this.multipleReturnAttribute,
    };
  }
}
