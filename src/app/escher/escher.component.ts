import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HookData} from '../hook/hook.component';

@Component({
  selector: 'app-escher',
  templateUrl: './escher.component.html',
  styleUrls: ['./escher.component.css']
})
export class EscherComponent implements OnInit {
  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() disabled = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  _disabled = true;

  @Input()
  set hookData(hookData: HookData) {
    console.log('hk change', hookData);
    this._disabled = !hookData || !hookData.enabled || hookData.type !== 'escher';
    this.disabled.emit(this._disabled);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
