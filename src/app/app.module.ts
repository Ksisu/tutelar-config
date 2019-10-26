import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatSelectModule} from '@angular/material';
import {ProvidersComponent} from './providers/providers.component';
import {FormsModule} from '@angular/forms';
import {PasswordDifficultyCheckerComponent} from './password-difficulty-checker/password-difficulty-checker.component';
import {SecretComponent} from './secret/secret.component';
import {EmailComponent} from './email/email.component';
import {AmqpComponent} from './amqp/amqp.component';
import {LdapComponent} from './ldap/ldap.component';
import {Oauth2Component} from './oauth2/oauth2.component';
import {Oauth2ProviderComponent} from './oauth2-provider/oauth2-provider.component';
import {TotpComponent} from './totp/totp.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    PasswordDifficultyCheckerComponent,
    SecretComponent,
    EmailComponent,
    AmqpComponent,
    LdapComponent,
    Oauth2Component,
    Oauth2ProviderComponent,
    TotpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
