import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface EmailValue {
  serviceType: string;
  amqpQueueName?: string;
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
  amqpQueueName = 'tutelar_email';
  amqpBufferSize = '100';

  host = 'localhost';
  port = 1025;
  ssl = false;
  username = '';
  password = '';
  senderAddress = 'no-reply@tutelar';
  registerTitle = '[Tutelar] Register';
  registerBody = 'Hello!\n<br/>\n<a href=\'https://lvh.me:9443/index.html?registerToken=<<TOKEN>>\'>Click here to register!</a>';
  resetPasswordTitle = '[Tutelar] Reset password';
  // tslint:disable-next-line:max-line-length
  resetPasswordBody = 'Hello!\n<br/>\n<a href=\'https://lvh.me:9443/index.html?resetPasswordToken=<<TOKEN>>\'>Click here to reset password!</a>';

  constructor() {
  }

  ngOnInit() {
    this.change();
  }

  change() {
    const result = {
      serviceType: this.serviceType,
      amqpQueueName: this.amqpQueueName,
      amqpBufferSize: this.amqpBufferSize
    };
    this.value.emit(result);
  }
}
