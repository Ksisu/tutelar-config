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
    switch (this.secretFrom) {
      case 'file':
        this.secretPath = value.value;
        break;
      case 'config':
        this.secretValue = value.value;
        break;
      case 'env':
        this.envName = value.value;
        break;
    }
  }

  @Output() valueChange = new EventEmitter<SecretValue>();

  @Input() disabled = false;

  secretFrom = 'file';
  secretPath = '';
  secretValue = '';
  envName = '';

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    let value;
    switch (this.secretFrom) {
      case 'file':
        value = this.secretPath;
        break;
      case 'config':
        value = this.secretValue;
        break;
      case 'env':
        value = this.envName;
        break;
    }
    const result = {from: this.secretFrom, value};
    this.valueChange.emit(result);
  }

}
