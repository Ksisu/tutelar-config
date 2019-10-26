import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmailValue} from '../email/email.component';

@Component({
  selector: 'app-amqp',
  templateUrl: './amqp.component.html',
  styleUrls: ['./amqp.component.css']
})
export class AmqpComponent implements OnInit {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  // tslint:disable-next-line:variable-name
  _selectedProviders = [];
  // tslint:disable-next-line:variable-name
  _emailServiceValue: EmailValue;

  value;

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    this._selectedProviders = selectedProviders;
    this.refreshDisable();
  }

  @Input()
  set emailServiceValue(emailServiceValue: EmailValue) {
    this._emailServiceValue = emailServiceValue;
    this.refreshDisable();
  }

  private refreshDisable() {
    // tslint:disable-next-line:max-line-length
    this._disabled = this._selectedProviders.indexOf('email') < 0 || !this._emailServiceValue || this._emailServiceValue.serviceType !== 'amqp';
    this.disabled.emit(this._disabled);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
