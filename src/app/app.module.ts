import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
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
import {DatabaseComponent} from './database/database.component';
import {DatabasePostgresComponent} from './database-postgres/database-postgres.component';
import {DatabaseMongodbComponent} from './database-mongodb/database-mongodb.component';
import {CallbackComponent} from './callback/callback.component';
import {HookComponent} from './hook/hook.component';
import {HookBasicComponent} from './hook-basic/hook-basic.component';
import {EscherComponent} from './escher/escher.component';
import {HealthcheckComponent} from './healthcheck/healthcheck.component';
import {JwtComponent} from './jwt/jwt.component';
import {LdapApiComponent} from './ldap-api/ldap-api.component';
import {EscherServiceComponent} from './escher-service/escher-service.component';
import {ConfigResultComponent} from './config-generator/config-result.component';
import {HelloComponent} from './hello/hello.component';
import {ProviderLoginExpirationComponent} from './provider-login-expiration/provider-login-expiration.component';
import {TracerComponent} from './tracer/tracer.component';

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
    TotpComponent,
    DatabaseComponent,
    DatabasePostgresComponent,
    DatabaseMongodbComponent,
    CallbackComponent,
    HookComponent,
    HookBasicComponent,
    EscherComponent,
    HealthcheckComponent,
    JwtComponent,
    LdapApiComponent,
    EscherServiceComponent,
    ConfigResultComponent,
    HelloComponent,
    ProviderLoginExpirationComponent,
    TracerComponent
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
