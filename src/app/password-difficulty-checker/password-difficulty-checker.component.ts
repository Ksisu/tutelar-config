import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-password-difficulty-checker',
  templateUrl: './password-difficulty-checker.component.html',
  styleUrls: ['./password-difficulty-checker.component.css']
})
export class PasswordDifficultyCheckerComponent implements OnInit {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    this._disabled = selectedProviders.indexOf('basic') < 0 && selectedProviders.indexOf('email') < 0;
    this.disabled.emit(this._disabled);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
