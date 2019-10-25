import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatExpansionModule, MatInputModule} from '@angular/material';
import {ProvidersComponent} from './providers/providers.component';
import {FormsModule} from '@angular/forms';
import {PasswordDifficultyCheckerComponent} from './password-difficulty-checker/password-difficulty-checker.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    PasswordDifficultyCheckerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
