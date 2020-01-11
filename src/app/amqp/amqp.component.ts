import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-amqp',
  templateUrl: './amqp.component.html',
  styleUrls: ['./amqp.component.css']
})
export class AmqpComponent {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  uri = {from: 'file', value: ''};

  constructor() {
  }

}
