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

  disabled = true;

  @Input()
  set selectedProviders(selectedProviders: string[]) {
    this.disabled = selectedProviders.indexOf('basic') < 0 && selectedProviders.indexOf('email') < 0;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
