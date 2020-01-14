import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-escher-service',
  templateUrl: './escher-service.component.html',
  styleUrls: ['./escher-service.component.css']
})
export class EscherServiceComponent {

  @Input() name = '';
  @Input() desc = '';
  @Input() disabled = false;

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Output() changed = new EventEmitter<any>();

  value = {
    key: '',
    secret: {from: 'file', value: ''},
    scope: 'eu/tutelar/request',
  };

  constructor() {
  }

}
