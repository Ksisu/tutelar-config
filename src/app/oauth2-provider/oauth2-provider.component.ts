import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-oauth2-provider',
  templateUrl: './oauth2-provider.component.html',
  styleUrls: ['./oauth2-provider.component.css']
})
export class Oauth2ProviderComponent implements OnInit {
  @Input() name: string;
  @Input() defaultScopes: string;

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  clientId = '';
  clientSecret = {from: 'file', value: ''};
  scopes = '';

  constructor() {
  }

  ngOnInit() {
    this.scopes = this.defaultScopes;
  }

  getValue() {
    return {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      scopes: this.scopes,
    };
  }
}
