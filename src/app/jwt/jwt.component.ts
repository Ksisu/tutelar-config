import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecretValue} from '../secret/secret.component';

export interface JwtData {
  algorithm: string;
  secret?: SecretValue;
  privateKey?: SecretValue;
  publicKey?: SecretValue;
  expirationTime: string;
}

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.css']
})
export class JwtComponent implements OnInit {

  static symmetricAlgos = ['HMD5', 'HS224', 'HS256', 'HS384', 'HS512'];
  static asymmetricAlgos = ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'];
  symmetricAlgos = JwtComponent.symmetricAlgos;
  asymmetricAlgos = JwtComponent.asymmetricAlgos;

  @Input() name = '';
  @Input() desc = '';
  @Input() disabled = false;

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  @Input()
  set value(value: JwtData) {
    if (!!value) {
      this.algorithm = value.algorithm;
      this.expirationTime = value.expirationTime;
      this.refreshIsSymmetric();
      if (this.isSymmetric) {
        if (!!value.secret) {
          this.secret = value.secret;
        }
      } else {
        if (!!value.privateKey && !!value.publicKey) {
          this.privateKey = value.privateKey;
          this.publicKey = value.publicKey;
        }
      }
    }
  }

  @Output() valueChange = new EventEmitter<JwtData>();

  algorithm = 'RS512';
  isSymmetric = false;

  secret = {from: 'file', value: ''};
  privateKey = {from: 'file', value: ''};
  publicKey = {from: 'file', value: ''};

  expirationTime = '1h';

  static isSymmetric(name: string) {
    return JwtComponent.symmetricAlgos.indexOf(name) >= 0;
  }

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    this.refreshIsSymmetric();

    if (this.isSymmetric) {
      this.valueChange.emit({algorithm: this.algorithm, expirationTime: this.expirationTime, secret: this.secret});
    } else {
      this.valueChange.emit({
        algorithm: this.algorithm,
        expirationTime: this.expirationTime,
        privateKey: this.privateKey,
        publicKey: this.publicKey
      });
    }
  }

  private refreshIsSymmetric() {
    this.isSymmetric = JwtComponent.isSymmetric(this.algorithm);
  }
}
