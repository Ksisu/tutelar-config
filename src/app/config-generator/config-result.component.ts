import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-config-result',
  templateUrl: './config-result.component.html',
  styleUrls: ['./config-result.component.css']
})
export class ConfigResultComponent {
  @Input() expanded: boolean;
  @Output() opened = new EventEmitter<any>();

  @Input()
  result = '';

  constructor() { }

}
