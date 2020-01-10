import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  step = 0;

  selectedProviders = [];
  emailServiceValue;
  hookServiceValue;

  shortTermJwt = {algorithm: 'RS512', expirationTime: '1h'};
  longTermJwt = {algorithm: 'RS512', expirationTime: '1d'};
  emailJwt = {algorithm: 'HS256', expirationTime: '30m'};
  totpJwt = {algorithm: 'HS256', expirationTime: '10m'};
  hookJwt = {algorithm: 'HS256', expirationTime: '5m'};

  modulesDisabledState = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false // finish
  ];

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    let nextStep = this.step;
    while (this.modulesDisabledState[++nextStep]) {
    }
    this.step = nextStep;
  }

}
