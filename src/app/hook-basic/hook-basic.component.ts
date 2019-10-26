import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecretValue} from '../secret/secret.component';

export interface BasicData {
  username: string;
  password: SecretValue;
}

@Component({
  selector: 'app-hook-basic',
  templateUrl: './hook-basic.component.html',
  styleUrls: ['./hook-basic.component.css']
})
export class HookBasicComponent implements OnInit {

  @Input() value: BasicData;
  @Output() valueChange = new EventEmitter<BasicData>();

  @Input() disabled: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
