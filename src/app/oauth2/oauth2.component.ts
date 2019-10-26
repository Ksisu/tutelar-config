import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.css']
})
export class Oauth2Component implements OnInit {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    // tslint:disable-next-line:max-line-length
    this._disabled = selectedProviders.indexOf('github') < 0 && selectedProviders.indexOf('facebook') < 0 && selectedProviders.indexOf('google') < 0;
    this.disabled.emit(this._disabled);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
