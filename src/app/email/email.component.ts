import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface EmailValue {
  serviceType: string;
  amqpRoutingKey?: string;
  amqpExchange?: string;
  amqpBufferSize?: string;
}

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    this._disabled = selectedProviders.indexOf('email') < 0;
    this.disabled.emit(this._disabled);
  }

  @Output() value = new EventEmitter<EmailValue>();

  serviceType = 'amqp';
  amqpRoutingKey = 'tutelar_email';
  amqpExchange = 'amq.topic';
  amqpBufferSize = '100';

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    const result = {
      serviceType: this.serviceType,
      amqpRoutingKey: this.amqpRoutingKey,
      amqpExchange: this.amqpExchange,
      amqpBufferSize: this.amqpBufferSize
    };
    this.value.emit(result);
  }
}
