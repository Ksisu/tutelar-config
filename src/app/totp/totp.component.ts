import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.css']
})
export class TotpComponent {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  algorithms = [
    'MD5',
    'SHA1',
    'SHA256',
    'SHA512',
  ];
  algorithm = 'SHA1';
  window = '1';
  period = '30s';
  digits = '6';
  startFromCurrentTime = false;

  constructor() {
  }

  getValue() {
    return {
      algorithm: this.algorithm,
      window: this.window,
      period: this.period,
      digits: this.digits,
      startFromCurrentTime: this.startFromCurrentTime,
    };
  }
}
