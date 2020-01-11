import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  serviceType = 'amqp';
  amqpQueueName = 'tutelar_email';
  amqpBufferSize = '100';

  host = 'localhost';
  port = 1025;
  ssl = false;
  username = '';
  password = {from: 'file', value: ''};
  senderAddress = 'no-reply@tutelar';
  registerTitle = '[Tutelar] Register';
  registerBody = 'Hello!\n<br/>\n<a href=\'https://lvh.me:9443/index.html?registerToken=<<TOKEN>>\'>Click here to register!</a>';
  resetPasswordTitle = '[Tutelar] Reset password';
  // tslint:disable-next-line:max-line-length
  resetPasswordBody = 'Hello!\n<br/>\n<a href=\'https://lvh.me:9443/index.html?resetPasswordToken=<<TOKEN>>\'>Click here to reset password!</a>';

  constructor() {
  }

  getValue() {
    switch (this.serviceType) {
      case 'amqp':
        return {
          serviceType: this.serviceType,
          amqpQueueName: this.amqpQueueName,
          amqpBufferSize: this.amqpBufferSize,
        };
      case 'smtp':
        return {
          serviceType: this.serviceType,
          host: this.host,
          port: this.port,
          ssl: this.ssl,
          username: this.username,
          password: this.password,
          senderAddress: this.senderAddress,
          registerTitle: this.registerTitle,
          registerBody: this.registerBody,
          resetPasswordTitle: this.resetPasswordTitle,
          resetPasswordBody: this.resetPasswordBody,
        };
      default:
        return {};
    }
  }

}
