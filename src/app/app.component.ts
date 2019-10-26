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
