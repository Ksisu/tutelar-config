import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecretValue} from '../secret/secret.component';

export interface EscherClientData {
  key: string;
  secret: SecretValue;
  scope: string;
}

@Component({
  selector: 'app-hook-escher',
  templateUrl: './hook-escher.component.html',
  styleUrls: ['./hook-escher.component.css']
})
export class HookEscherComponent implements OnInit {

  @Input() value: EscherClientData;
  @Output() valueChange = new EventEmitter<EscherClientData>();

  @Input() disabled: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
