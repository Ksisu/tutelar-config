import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecretValue} from '../secret/secret.component';

export interface PostgresData {
  url: SecretValue;
  numberOfThreads: string;
  maxPoolSize: string;
}


@Component({
  selector: 'app-database-postgres',
  templateUrl: './database-postgres.component.html',
  styleUrls: ['./database-postgres.component.css']
})
export class DatabasePostgresComponent implements OnInit {

  @Input() value: PostgresData;
  @Output() valueChange = new EventEmitter<PostgresData>();

  constructor() {
  }

  ngOnInit() {
  }

}
