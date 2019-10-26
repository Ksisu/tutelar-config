import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecretValue} from '../secret/secret.component';

export interface MongodbData {
  uri: SecretValue;
  collectionName: string;
}

@Component({
  selector: 'app-database-mongodb',
  templateUrl: './database-mongodb.component.html',
  styleUrls: ['./database-mongodb.component.css']
})
export class DatabaseMongodbComponent implements OnInit {

  @Input() value: MongodbData;
  @Output() valueChange = new EventEmitter<MongodbData>();

  constructor() {
  }

  ngOnInit() {
  }

}
