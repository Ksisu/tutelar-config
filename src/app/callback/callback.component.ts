import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Output() changed = new EventEmitter<any>();

  success = 'https://lvh.me:9443/index.html?token=<<TOKEN>>&refresh_token=<<REFRESH_TOKEN>>';
  failure = 'https://lvh.me:9443/index.html?error=<<ERROR>>';

  constructor() {
  }

  getValue() {
    return {
      success: this.success,
      failure: this.failure,
    };
  }
}
