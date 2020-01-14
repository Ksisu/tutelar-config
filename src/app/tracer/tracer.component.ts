import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-tracer',
  templateUrl: './tracer.component.html',
  styleUrls: ['./tracer.component.css']
})
export class TracerComponent {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Output() changed = new EventEmitter<any>();

  enabled = false;
  serviceName = 'tutelar';

  constructor() {
  }

  getValue() {
    if (!this.enabled) {
      return {enabled: this.enabled};
    } else {
      return {
        enabled: this.enabled,
        serviceName: this.serviceName,
      };
    }
  }
}
