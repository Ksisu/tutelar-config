import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JwtData} from '../jwt/jwt.component';

@Component({
  selector: 'app-jwt-for-provider',
  templateUrl: './jwt-for-provider.component.html',
  styleUrls: ['./jwt-for-provider.component.css']
})
export class JwtForProviderComponent implements OnInit {

  @Input() provider;
  @Input() name;
  @Input() desc;
  @Input() expanded: boolean;

  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Input() value;
  @Output() valueChange = new EventEmitter<JwtData>();

  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    this._disabled = selectedProviders.indexOf(this.provider) < 0;
    this.disabled.emit(this._disabled);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
