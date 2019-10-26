import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.css']
})
export class TotpComponent implements OnInit {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  algorithms = [
    'MD5',
    'SHA1',
    'SHA256',
    'SHA512',
  ];
  algorithm = 'SHA1';

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    this._disabled = selectedProviders.indexOf('totp') < 0;
    this.disabled.emit(this._disabled);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
