import {Component, OnInit, ViewChild} from '@angular/core';
import {ProvidersComponent} from './providers/providers.component';
import {PasswordDifficultyCheckerComponent} from './password-difficulty-checker/password-difficulty-checker.component';
import {EmailComponent} from './email/email.component';
import {AmqpComponent} from './amqp/amqp.component';
import {LdapComponent} from './ldap/ldap.component';
import {Oauth2Component} from './oauth2/oauth2.component';
import {Oauth2ProviderComponent} from './oauth2-provider/oauth2-provider.component';
import {TotpComponent} from './totp/totp.component';
import {DatabaseComponent} from './database/database.component';
import {CallbackComponent} from './callback/callback.component';
import {HookComponent} from './hook/hook.component';
import {EscherComponent} from './escher/escher.component';
import {HealthcheckComponent} from './healthcheck/healthcheck.component';
import {SecretValue} from './secret/secret.component';
import {JwtComponent, JwtData} from './jwt/jwt.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  step = 0;

  model = {
    selectedProviders: [],
    passwordDifficultyCheckerRegexPattern: '',
    emailService: {} as any,
    amqpUri: '',
    ldap: {} as any,
    oauth2RootUrl: '',
    oauth2: {
      github: {} as any,
      facebook: {} as any,
      google: {} as any,
    },
    totp: {} as any,
    database: {} as any,
    callback: {} as any,
    hook: {} as any,
    escher: {} as any,
    healthCheckEnabled: false,
    jwt: {
      shortTerm: {algorithm: 'RS512', expirationTime: '1h', privateKey: {from: 'file', value: ''}, publicKey: {from: 'file', value: ''}},
      longTerm: {algorithm: 'RS512', expirationTime: '1d', privateKey: {from: 'file', value: ''}, publicKey: {from: 'file', value: ''}},
      email: {algorithm: 'HS256', expirationTime: '30m', secret: {from: 'file', value: ''}},
      totp: {algorithm: 'HS256', expirationTime: '10m', secret: {from: 'file', value: ''}},
      hook: {algorithm: 'HS256', expirationTime: '5m', secret: {from: 'file', value: ''}},
    }
  };

  @ViewChild('providers', {static: true}) providersComp: ProvidersComponent;
  @ViewChild('passwordDifficultyChecker', {static: true}) passwordDifficultyCheckerComp: PasswordDifficultyCheckerComponent;
  @ViewChild('email', {static: true}) emailComp: EmailComponent;
  @ViewChild('amqp', {static: true}) amqpComp: AmqpComponent;
  @ViewChild('ldap', {static: true}) ldapComp: LdapComponent;
  @ViewChild('oauth2', {static: true}) oauth2Comp: Oauth2Component;
  @ViewChild('oauth2github', {static: true}) oauth2GithubComp: Oauth2ProviderComponent;
  @ViewChild('oauth2facebook', {static: true}) oauth2FacebookComp: Oauth2ProviderComponent;
  @ViewChild('oauth2google', {static: true}) oauth2GoogleComp: Oauth2ProviderComponent;
  @ViewChild('totp', {static: true}) totpComp: TotpComponent;
  @ViewChild('database', {static: true}) databaseComp: DatabaseComponent;
  @ViewChild('callback', {static: true}) callbackComp: CallbackComponent;
  @ViewChild('hook', {static: true}) hookComp: HookComponent;
  @ViewChild('escher', {static: true}) escherComp: EscherComponent;
  @ViewChild('healthcheck', {static: true}) healthcheckComp: HealthcheckComponent;


  modulesDisabledState = Array(20).fill(false);

  ngOnInit(): void {
    this.refresh();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    let nextStep = this.step;
    while (this.modulesDisabledState[++nextStep]) {
    }
    this.step = nextStep;
  }

  refresh() {
    // Refresh data model
    this.model.selectedProviders = this.providersComp.getSelectedProviders();
    this.model.passwordDifficultyCheckerRegexPattern = this.passwordDifficultyCheckerComp.regexPattern;
    this.model.emailService = this.emailComp.getValue();
    this.model.amqpUri = this.amqpComp.uri;
    this.model.ldap = this.ldapComp.getValue();
    this.model.oauth2RootUrl = this.oauth2Comp.rootUrl;
    this.model.oauth2.github = this.oauth2GithubComp.getValue();
    this.model.oauth2.facebook = this.oauth2FacebookComp.getValue();
    this.model.oauth2.google = this.oauth2GoogleComp.getValue();
    this.model.totp = this.totpComp.getValue();
    this.model.database = this.databaseComp.getValue();
    this.model.callback = this.callbackComp.getValue();
    this.model.hook = this.hookComp.getValue();
    this.model.escher = this.escherComp.getValue();
    this.model.healthCheckEnabled = this.healthcheckComp.getValue();

    // Refresh disable flags

    // PasswordDifficultyChecker
    this.modulesDisabledState[1] =
      this.model.selectedProviders.indexOf('basic') === -1 &&
      this.model.selectedProviders.indexOf('email') === -1;

    // EmailService
    this.modulesDisabledState[2] =
      this.model.selectedProviders.indexOf('email') === -1;

    // AMQP
    this.modulesDisabledState[3] =
      this.model.selectedProviders.indexOf('email') === -1 ||
      this.model.emailService.serviceType !== 'amqp';

    // LDAP
    this.modulesDisabledState[4] =
      this.model.selectedProviders.indexOf('ldap') === -1;

    // OAuth2
    this.modulesDisabledState[5] =
      this.model.selectedProviders.indexOf('github') < 0 &&
      this.model.selectedProviders.indexOf('facebook') < 0 &&
      this.model.selectedProviders.indexOf('google') < 0;

    // GitHub
    this.modulesDisabledState[6] =
      this.model.selectedProviders.indexOf('github') === -1;

    // Facebook
    this.modulesDisabledState[7] =
      this.model.selectedProviders.indexOf('facebook') === -1;

    // Google
    this.modulesDisabledState[8] =
      this.model.selectedProviders.indexOf('google') === -1;

    // TOTP
    this.modulesDisabledState[9] =
      this.model.selectedProviders.indexOf('totp') === -1;

    // Hook JWT
    this.modulesDisabledState[13] =
      !this.model.hook.enabled ||
      this.model.hook.type !== 'jwt';

    // Escher
    this.modulesDisabledState[14] =
      !this.model.hook.enabled ||
      this.model.hook.type !== 'escher';

    // Email JWT
    this.modulesDisabledState[18] =
      this.model.selectedProviders.indexOf('email') === -1;

    // TOTP JWT
    this.modulesDisabledState[19] =
      this.model.selectedProviders.indexOf('totp') === -1;
  }
}
