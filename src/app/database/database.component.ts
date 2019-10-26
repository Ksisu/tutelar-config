import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  @Input() expanded: boolean;
  @Output() nextStep = new EventEmitter<any>();
  @Output() opened = new EventEmitter<any>();

  databaseType = 'memory';

  mongoValue = {
    uri: {from: 'file', value: ''},
    collectionName: 'users',
  };

  postgresValue = {
    url: {from: 'file', value: ''},
    numberOfThreads: '5',
    maxPoolSize: '20',
  };

  constructor() {
  }

  ngOnInit() {
  }

}
