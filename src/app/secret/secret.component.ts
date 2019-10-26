import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface SecretValue {
  from: string;
  value: string;
}

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  @Input() label: string;

  @Input()
  set value(value: SecretValue) {
    this.secretFrom = value.from;
    if (this.secretFrom === 'file') {
      this.secretPath = value.value;
    } else {
      this.secretValue = value.value;
    }
  }

  @Output() valueChange = new EventEmitter<SecretValue>();

  secretFrom = 'file';
  secretPath = '';
  secretValue = '';

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    const value = this.secretFrom === 'file' ? this.secretPath : this.secretValue;
    const result = {from: this.secretFrom, value};
    this.valueChange.emit(result);
  }

}
