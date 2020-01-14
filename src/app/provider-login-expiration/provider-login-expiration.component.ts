import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-provider-login-expiration',
  templateUrl: './provider-login-expiration.component.html',
  styleUrls: ['./provider-login-expiration.component.css']
})
export class ProviderLoginExpirationComponent {
  @Input() name = '';
  @Input() desc = '';
  @Input() expanded: boolean;
  @Input() disabled = false;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Output() changed = new EventEmitter<any>();

  enabled = false;
  type = 'inactivity';
  duration = '1day';

  constructor() {
  }

  getValue() {
    if (!this.enabled || this.disabled) {
      return {enabled: false};
    }
    return {
      enabled: this.enabled,
      type: this.type,
      duration: this.duration,
    };
  }
}
