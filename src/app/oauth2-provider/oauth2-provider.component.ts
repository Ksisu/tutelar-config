import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-oauth2-provider',
  templateUrl: './oauth2-provider.component.html',
  styleUrls: ['./oauth2-provider.component.css']
})
export class Oauth2ProviderComponent implements OnInit {
  @Input() name: string;
  @Input() defaultScopes: string;

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    this._disabled = !this.name || selectedProviders.indexOf(this.name.toLowerCase()) < 0;
    this.disabled.emit(this._disabled);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
