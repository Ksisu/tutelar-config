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
  @Input() disabled = true;

  @Output() changed = new EventEmitter<any>();

  regexPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$';

  constructor() {
  }

  ngOnInit() {
  }

}
