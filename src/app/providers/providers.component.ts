import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();
  @Output() changed = new EventEmitter<any>();

  providers = [
    {id: 'basic', label: 'User-Pass', selected: false},
    {id: 'email', label: 'Email-Pass', selected: false},
    {id: 'ldap', label: 'LDAP / AD', selected: false},
    {id: 'github', label: 'GitHub', selected: false},
    {id: 'facebook', label: 'Facebook', selected: false},
    {id: 'google', label: 'Google', selected: false},
    {id: 'totp', label: 'TOTP', selected: false},
  ];

  constructor() {
  }

  ngOnInit() {
  }

  getSelectedProviders(): string[] {
    return this.providers.filter(p => p.selected).map(p => p.id);
  }
}
