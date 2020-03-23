import { Component, OnInit, ViewChild } from '@angular/core';
import { userData } from 'src/app/models/userData';
import {OrchestratorService} from '../../services/orchestrator.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  data: userData[];

  constructor(private s: OrchestratorService) {}

  getAddress(): string {
    return this.data[6].value;
  }

  ngOnInit(): void {
    this.data = [
      {
        name: 'Vorname',
        type: 'text',
        value: 'Keine',
        changeable: true
      },
      {
        name: 'Nachname',
        type: 'text',
        value: 'Ahnung',
        changeable: true
      },
      {
        name: 'Geburtstag',
        type: 'date',
        value: '04.02.1969',
        changeable: true
      },
      {
        name: 'Email',
        type: 'text',
        value: 'keineahnung@web.de',
        changeable: true
      },
      {
        name: 'Telefonnummer',
        type: 'text',
        value: '01736488282',
        changeable: true
      },
      {
        name: 'Passwort',
        type: 'password',
        value: '123456',
        changeable: false
      },
      {
        name: 'Adresse',
        type: 'text',
        value: 'leer',
        changeable: true
      }
    ];
  }

}
