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
import {LdapApiComponent} from './ldap-api/ldap-api.component';
import {EscherServiceComponent} from './escher-service/escher-service.component';
import {ConfigResultComponent} from './config-generator/config-result.component';
import {HelloComponent} from './hello/hello.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  model = {
    selectedProviders: [],
    passwordDifficultyCheckerRegexPattern: '',
    emailService: {} as any,
    amqpUri: {from: 'file', value: ''},
    ldap: {} as any,
    ldapApi: {} as any,
    ldapApiEscher: {} as any,
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
    hookEscher: {} as any,
    escher: {} as any,
    healthCheckEnabled: false,
    jwt: {
      shortTerm: {algorithm: 'RS512', expirationTime: '1h', privateKey: {from: 'file', value: ''}, publicKey: {from: 'file', value: ''}},
      longTerm: {algorithm: 'RS512', expirationTime: '1d', privateKey: {from: 'file', value: ''}, publicKey: {from: 'file', value: ''}},
      email: {algorithm: 'HS256', expirationTime: '30m', secret: {from: 'file', value: ''}},
      totp: {algorithm: 'HS256', expirationTime: '10m', secret: {from: 'file', value: ''}},
      hook: {algorithm: 'HS256', expirationTime: '5m', secret: {from: 'file', value: ''}},
      ldapApi: {algorithm: 'HS256', expirationTime: '5m', secret: {from: 'file', value: ''}},
    }
  };

  @ViewChild('hello', {static: true}) helloComp: HelloComponent;
  @ViewChild('providers', {static: true}) providersComp: ProvidersComponent;
  @ViewChild('passwordDifficultyChecker', {static: true}) passwordDifficultyCheckerComp: PasswordDifficultyCheckerComponent;
  @ViewChild('email', {static: true}) emailComp: EmailComponent;
  @ViewChild('amqp', {static: true}) amqpComp: AmqpComponent;
  @ViewChild('ldap', {static: true}) ldapComp: LdapComponent;
  @ViewChild('ldapApi', {static: true}) ldapApiComp: LdapApiComponent;
  @ViewChild('ldapApiJwt', {static: true}) ldapApiJwtComp: JwtComponent;
  @ViewChild('ldapApiEscher', {static: true}) ldapApiEscherComp: EscherServiceComponent;
  @ViewChild('oauth2', {static: true}) oauth2Comp: Oauth2Component;
  @ViewChild('oauth2github', {static: true}) oauth2GithubComp: Oauth2ProviderComponent;
  @ViewChild('oauth2facebook', {static: true}) oauth2FacebookComp: Oauth2ProviderComponent;
  @ViewChild('oauth2google', {static: true}) oauth2GoogleComp: Oauth2ProviderComponent;
  @ViewChild('totp', {static: true}) totpComp: TotpComponent;
  @ViewChild('database', {static: true}) databaseComp: DatabaseComponent;
  @ViewChild('callback', {static: true}) callbackComp: CallbackComponent;
  @ViewChild('hook', {static: true}) hookComp: HookComponent;
  @ViewChild('hookJwt', {static: true}) hookJwtComp: JwtComponent;
  @ViewChild('hookEscher', {static: true}) hookEscherComp: EscherServiceComponent;
  @ViewChild('escher', {static: true}) escherComp: EscherComponent;
  @ViewChild('healthcheck', {static: true}) healthcheckComp: HealthcheckComponent;
  @ViewChild('shortTermJwt', {static: true}) shortTermJwtComp: JwtComponent;
  @ViewChild('longTermJwt', {static: true}) longTermJwtComp: JwtComponent;
  @ViewChild('emailProviderJwt', {static: true}) emailProviderJwtComp: JwtComponent;
  @ViewChild('totpProviderJwt', {static: true}) totpProviderJwtComp: JwtComponent;
  @ViewChild('result', {static: true}) resultComp: ConfigResultComponent;

  step: any = null;
  steps: any[] = [];

  ngOnInit(): void {
    this.steps = [
      this.helloComp,
      this.providersComp,
      this.passwordDifficultyCheckerComp,
      this.emailComp,
      this.emailProviderJwtComp,
      this.amqpComp,
      this.ldapComp,
      this.ldapApiComp,
      this.ldapApiJwtComp,
      this.ldapApiEscherComp,
      this.oauth2Comp,
      this.oauth2GithubComp,
      this.oauth2FacebookComp,
      this.oauth2GoogleComp,
      this.totpComp,
      this.totpProviderJwtComp,
      this.databaseComp,
      this.callbackComp,
      this.hookComp,
      this.hookJwtComp,
      this.hookEscherComp,
      this.escherComp,
      this.healthcheckComp,
      this.shortTermJwtComp,
      this.longTermJwtComp,
      this.resultComp,
    ];
    this.step = this.steps[0];
    this.refresh();
  }

  setStep(element) {
    this.step = element;
  }

  nextStep() {
    const stepsLength = this.steps.length;
    let nextStepIdx = (this.steps.indexOf(this.step) + 1) % stepsLength;
    while (this.steps[nextStepIdx].disabled === true) {
      nextStepIdx = (nextStepIdx + 1) % stepsLength;
    }
    this.step = this.steps[nextStepIdx];
  }

  refresh() {
    // Refresh data model
    this.model.selectedProviders = this.providersComp.getSelectedProviders();
    this.model.passwordDifficultyCheckerRegexPattern = this.passwordDifficultyCheckerComp.regexPattern;
    this.model.emailService = this.emailComp.getValue();
    this.model.amqpUri = this.amqpComp.uri;
    this.model.ldap = this.ldapComp.getValue();
    this.model.ldapApi = this.ldapApiComp.getValue();
    this.model.ldapApiEscher = this.ldapApiEscherComp.value;
    this.model.oauth2RootUrl = this.oauth2Comp.rootUrl;
    this.model.oauth2.github = this.oauth2GithubComp.getValue();
    this.model.oauth2.facebook = this.oauth2FacebookComp.getValue();
    this.model.oauth2.google = this.oauth2GoogleComp.getValue();
    this.model.totp = this.totpComp.getValue();
    this.model.database = this.databaseComp.getValue();
    this.model.callback = this.callbackComp.getValue();
    this.model.hook = this.hookComp.getValue();
    this.model.hookEscher = this.hookEscherComp.value;
    this.model.escher = this.escherComp.getValue();
    this.model.healthCheckEnabled = this.healthcheckComp.getValue();

    // Refresh disable flags
    this.passwordDifficultyCheckerComp.disabled =
      this.model.selectedProviders.indexOf('basic') === -1 &&
      this.model.selectedProviders.indexOf('email') === -1;

    this.emailComp.disabled =
      this.model.selectedProviders.indexOf('email') === -1;

    this.amqpComp.disabled =
      this.model.selectedProviders.indexOf('email') === -1 ||
      this.model.emailService.serviceType !== 'amqp';

    this.ldapComp.disabled =
      this.model.selectedProviders.indexOf('ldap') === -1;

    this.ldapApiComp.disabled =
      this.model.selectedProviders.indexOf('ldap') === -1;

    this.ldapApiJwtComp.disabled =
      !this.model.ldapApi.enabled ||
      this.model.ldapApi.authType !== 'jwt';

    this.ldapApiEscherComp.disabled =
      !this.model.ldapApi.enabled ||
      this.model.ldapApi.authType !== 'escher';

    this.oauth2Comp.disabled =
      this.model.selectedProviders.indexOf('github') < 0 &&
      this.model.selectedProviders.indexOf('facebook') < 0 &&
      this.model.selectedProviders.indexOf('google') < 0;

    this.oauth2GithubComp.disabled =
      this.model.selectedProviders.indexOf('github') === -1;

    this.oauth2FacebookComp.disabled =
      this.model.selectedProviders.indexOf('facebook') === -1;

    this.oauth2GoogleComp.disabled =
      this.model.selectedProviders.indexOf('google') === -1;

    this.totpComp.disabled =
      this.model.selectedProviders.indexOf('totp') === -1;

    this.hookJwtComp.disabled =
      !this.model.hook.enabled ||
      this.model.hook.type !== 'jwt';

    this.hookEscherComp.disabled =
      !this.model.hook.enabled ||
      this.model.hook.type !== 'escher';

    this.escherComp.disabled =
      (!this.model.hook.enabled ||
        this.model.hook.type !== 'escher') &&
      this.ldapApiEscherComp.disabled;

    this.emailProviderJwtComp.disabled =
      this.emailComp.disabled;

    this.totpProviderJwtComp.disabled =
      this.model.selectedProviders.indexOf('totp') === -1;

    // Generate config
    let result = '';
    result += this.generateModulesEnabledConfig();
    result += this.generateDatabaseConfig();
    result += this.generateJwtConfig();
    result += this.generateCallbackConfig();
    result += this.generateEscherConfig();
    result += this.generateHookConfig();
    result += this.generateAmqpConfig();
    result += this.generateOauth2Config();
    result += this.generateLdapConfig();
    result += this.generateUserpassConfig();
    result += this.generateTotpConfig();
    result += this.generateTracerConfig();
    result += this.generateAkkaConfig();
    this.resultComp.result = result;
  }

  generateModulesEnabledConfig() {
    const result = this.model.selectedProviders.join(',') + (this.model.healthCheckEnabled ? ',health' : '');
    return `modulesEnabled = "${result}"\n`;
  }

  generateSecretConfig(name: string, secret: SecretValue) {
    switch (secret.from) {
      case 'file':
        return `${name}File = "${secret.value}"`;
      case 'config':
        return `${name} = "${secret.value}"`;
      case 'env':
        return `${name} = \${"${secret.value}}"`;
    }
  }

  generateDatabaseConfig() {
    const type = this.model.database.databaseType;
    let result = 'database {\n' +
      `  type = ${type}\n`;
    switch (type) {
      case 'mongo':
        result += '  mongo {\n' +
          '    ' + this.generateSecretConfig('uri', this.model.database.value.uri) + '\n' +
          `    collection = "${this.model.database.value.collectionName}"\n` +
          '  }\n';
        break;
      case 'postgres':
        result += '  postgres {\n' +
          '    driver = "org.postgresql.Driver"\n' +
          '    ' + this.generateSecretConfig('uri', this.model.database.value.url) + '\n' +
          `    numThreads = ${this.model.database.value.numberOfThreads}\n` +
          `    maximumPoolSize = ${this.model.database.value.maxPoolSize}\n` +
          '    connectionPool = "HikariCP"\n' +
          '  }\n';
        break;
      default:
    }
    result += '}\n';
    return result;
  }

  generateOneJwtConfig(name: string, config: JwtData) {
    let result = `  ${name} {\n`;
    result += `    expirationTime = "${config.expirationTime}"\n` +
      `    algorithm = "${config.algorithm}"\n`;

    if (JwtComponent.isSymmetric(config.algorithm)) {
      result += '    ' + this.generateSecretConfig('secret', config.secret) + '\n';
    } else {
      result += '    ' + this.generateSecretConfig('privateKey', config.privateKey) + '\n';
      result += '    ' + this.generateSecretConfig('publicKey', config.publicKey) + '\n';
    }
    result += '  }\n';
    return result;
  }

  generateJwtConfig() {
    let result = 'jwt {\n';
    result += this.generateOneJwtConfig('shortTerm', this.model.jwt.shortTerm);
    result += this.generateOneJwtConfig('longTerm', this.model.jwt.longTerm);
    if (!this.emailProviderJwtComp.disabled) {
      result += this.generateOneJwtConfig('emailProvider', this.model.jwt.email);
    }
    if (!this.totpProviderJwtComp.disabled) {
      result += this.generateOneJwtConfig('totpProvider', this.model.jwt.totp);
    }
    if (!this.hookJwtComp.disabled) {
      result += this.generateOneJwtConfig('hook', this.model.jwt.hook);
    }
    if (!this.ldapApiJwtComp.disabled) {
      result += this.generateOneJwtConfig('ldapApi', this.model.jwt.ldapApi);
    }
    result += '}\n';
    return result;
  }

  generateCallbackConfig() {
    let result = '';
    result += 'callback {\n';
    result += `  success = "${this.model.callback.success}"\n`;
    result += `  failure = "${this.model.callback.failure}"\n`;
    result += '}\n';
    return result;
  }

  generateEscherConfig() {
    const hookEscher = !this.hookEscherComp.disabled;
    const ldapApiEscher = !this.ldapApiEscherComp.disabled;

    if (!hookEscher && !ldapApiEscher) {
      return '';
    }

    let result = '';
    result += 'escher {\n';
    result += `  credential-scope = "${this.model.escher.credentialScope}"\n`;
    result += `  auth-header-name = "${this.model.escher.authHeaderName}"\n`;
    result += `  date-header-name = "${this.model.escher.dateHeaderName}"\n`;
    result += `  headers-to-sign = ["host", "${this.model.escher.dateHeaderName}"]\n`;
    result += `  headers-to-sign = ["host", "${this.model.escher.dateHeaderName}"]\n`;
    result += `  headers-to-sign = ["host", "${this.model.escher.dateHeaderName}"]\n`;
    result += `  algo-prefix = "${this.model.escher.algoPrefix}"\n`;
    result += `  vendor-key = "${this.model.escher.vendorKey}"\n`;
    result += `  hostname = "${this.model.escher.hostname}"\n`;
    result += `  port = "${this.model.escher.port}"\n`;
    result += '  trusted-services = [\n';
    if (hookEscher) {
      result += '    {\n';
      result += `      name = "hook"\n`;
      result += `      key = "${this.model.hookEscher.key}"\n`;
      result += '      ' + this.generateSecretConfig('secret', this.model.hookEscher.secret) + '\n';
      result += `      credential-scope = "${this.model.hookEscher.scope}"\n`;
      result += '    }';
    }
    result += (hookEscher && ldapApiEscher) ? ',\n' : '\n';
    if (ldapApiEscher) {
      result += '    {\n';
      result += `      name = "ldap-api"\n`;
      result += `      key = "${this.model.ldapApiEscher.key}"\n`;
      result += '      ' + this.generateSecretConfig('secret', this.model.ldapApiEscher.secret) + '\n';
      result += `      credential-scope = "${this.model.ldapApiEscher.scope}"\n`;
      result += '    }';
    }
    result += '  ]\n';
    result += '}\n';
    return result;
  }

  generateHookConfig() {
    if (!this.model.hook.enabled) {
      return 'hook {\n  baseUrl = ""\n}\n';
    }
    let result = '';
    result += 'hook {\n';
    result += `  baseUrl = "${this.model.hook.baseUrl}"\n`;
    result += `  enabled = "${this.model.hook.enabledHooks.join(',')}"\n`;
    result += `  authType = "${this.model.hook.type}"\n`;
    if (this.model.hook.type === 'basic') {
      result += '  basicAuth {\n';
      result += `    username = "${this.model.hook.data.username}"\n`;
      result += '    ' + this.generateSecretConfig('password', this.model.hook.data.password) + '\n';
      result += '  }\n';
    }
    result += '}\n';
    return result;
  }

  generateAmqpConfig() {
    if (this.amqpComp.disabled) {
      return '';
    }
    let result = '';
    result += 'amqp {\n';
    result += '  ' + this.generateSecretConfig('password', this.model.amqpUri) + '\n';
    result += '}\n';
    return result;
  }

  generateTracerConfig() {
    return 'tracer {\n  client = "off"\n}\n'; // TODO
  }

  generateOneOauth2Config(name: string, data) {
    let result = '';
    result += `  ${name} {\n`;
    result += `    clientId = "${data.clientId}"\n`;
    result += '    ' + this.generateSecretConfig('clientSecret', data.clientSecret) + '\n';
    result += `    scopes = "${data.scopes}"\n`;
    result += '  }\n';
    return result;
  }

  generateOauth2Config() {
    const githubEnabled = !this.oauth2GithubComp.disabled;
    const facebookEnabled = !this.oauth2FacebookComp.disabled;
    const googleEnabled = !this.oauth2GoogleComp.disabled;

    if (!githubEnabled && !facebookEnabled && !googleEnabled) {
      return '';
    }

    let result = '';
    result += 'oauth2 {\n';
    result += `  rootUrl = "${this.model.oauth2RootUrl}"\n`;
    if (githubEnabled) {
      result += this.generateOneOauth2Config('github', this.model.oauth2.github);
    }
    if (facebookEnabled) {
      result += this.generateOneOauth2Config('facebook', this.model.oauth2.facebook);
    }
    if (googleEnabled) {
      result += this.generateOneOauth2Config('google', this.model.oauth2.google);
    }
    result += '}\n';
    return result;
  }

  generateLdapConfig() {
    if (this.ldapComp.disabled) {
      return '';
    }

    let result = '';
    result += 'ldap {\n';
    result += `  url = "${this.model.ldap.url}"\n`;
    result += `  readonlyUserWithNamespace = "${this.model.ldap.user}"\n`;
    result += '  ' + this.generateSecretConfig('readonlyUserPassword', this.model.ldap.password) + '\n';
    result += `  userSearchBaseDomain = "${this.model.ldap.userSearchBaseDomain}"\n`;
    result += `  userSearchAttribute = "${this.model.ldap.searchAttribute}"\n`;
    result += `  userSearchReturnAttributes = "${this.model.ldap.singleReturnAttribute}"\n`;
    result += `  userSearchReturnArrayAttributes = "${this.model.ldap.singleReturnAttribute}"\n`;
    result += '  ldapApi {\n';
    const type = this.model.ldapApi.enabled ? this.model.ldapApi.authType : 'blocked';
    result += `    auth = "${type}"\n`;
    if (type === 'basic') {
      result += '    basic {\n';
      result += `      username = "${this.model.ldapApi.basic.username}"\n`;
      result += '      ' + this.generateSecretConfig('password', this.model.ldapApi.basic.password) + '\n';
      result += '    }\n';
    } else if (type === 'escher') {
      result += '    escher {\n';
      result += '      trustedServices = "ldap-api"\n';
      result += '    }\n';
    } else if (type === 'jwt') {
      result += '    jwt {\n';
      result += '      configName = "ldapApi"\n';
      result += '    }\n';
    }
    result += '  }\n';
    result += '}\n';
    return result;
  }

  generateUserpassConfig() {
    const basicEnabled = this.model.selectedProviders.indexOf('user') !== -1;
    const emailEnabled = this.model.selectedProviders.indexOf('email') !== -1;

    if (!basicEnabled && !emailEnabled) {
      return '';
    }

    let result = '';
    result += 'userpass {\n';
    result += '  passwordDifficulty {\n';
    result += `    pattern = "${this.model.passwordDifficultyCheckerRegexPattern}"\n`;
    result += '  }\n';
    if (emailEnabled) {
      result += '  email {\n';
      result += `    type = "${this.model.emailService.serviceType}"\n`;
      switch (this.model.emailService.serviceType) {
        case 'smtp':
          result += '    smtp {\n';
          result += `      host = "${this.model.emailService.host}"\n`;
          result += `      port = "${this.model.emailService.port}"\n`;
          result += `      ssl = ${this.model.emailService.ssl.toString()}\n`;
          result += `      username = "${this.model.emailService.username}"\n`;
          result += `      password = "${this.model.emailService.password}"\n`;
          result += `      template {\n`;
          result += `        senderAddress = "${this.model.emailService.senderAddress}"\n`;
          result += `        registerTitle = "${this.model.emailService.registerTitle}"\n`;
          result += `        registerBody = "${this.model.emailService.registerBody.replace('\n', '')}"\n`;
          result += `        resetPasswordTitle = "${this.model.emailService.resetPasswordTitle}"\n`;
          result += `        resetPasswordBody = "${this.model.emailService.resetPasswordBody.replace('\n', '')}"\n`;
          result += `      }\n`;
          result += '    }\n';
          break;
        case 'amqp':
          result += '    amqp {\n';
          // TODO
          result += '    }\n';
          break;
        default:
      }
      result += '  }\n';
    }
    result += '}\n';
    return result;
  }

  generateTotpConfig() {
    if (this.totpComp.disabled) {
      return '';
    }

    let result = '';
    result += 'totp {\n';
    result += `  algorithm = "${this.model.totp.algorithm}"\n`;
    result += `  window = "${this.model.totp.window}"\n`;
    result += `  period = "${this.model.totp.period}"\n`;
    result += `  digits = "${this.model.totp.digits}"\n`;
    result += `  startFromCurrentTime = ${this.model.totp.startFromCurrentTime.toString()}\n`;
    result += '}\n';
    return result;
  }

  generateAkkaConfig() {
    return 'akka {\n' +
      '  loggers = ["akka.event.slf4j.Slf4jLogger"]\n' +
      '  loglevel = "DEBUG"\n' +
      '  logging-filter = "akka.event.slf4j.Slf4jLoggingFilter"\n' +
      '  http {\n' +
      '    client {\n' +
      '      idle-timeout = 120 s\n' +
      '    }\n' +
      '    host-connection-pool {\n' +
      '      idle-timeout = 150 s\n' +
      '    }\n' +
      '  }\n' +
      '}\n';
  }
}
