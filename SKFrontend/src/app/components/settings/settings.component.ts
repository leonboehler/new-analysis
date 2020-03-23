import { Component, OnInit, ViewChild } from '@angular/core';
import { userData } from 'src/app/models/userData';
import {OrchestratorService} from '../../services/orchestrator.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  data: userData[];

  constructor(private s: OrchestratorService, private router: Router) {}

  getAddress(): string[] {
    const contentAddress: string[] = [];
    const data = this.s.getCurrentUser();
    contentAddress.push(data.address.street + data.address.streetNumber);
    contentAddress.push(data.address.postCode + ' ' + data.address.city);
    contentAddress.push(data.address.country + ', ' + data.address.state);

    console.log(contentAddress);
    return contentAddress;
  }

  updatePassword(): void {
    //this.router.navigate(['.']);
  }

  ngOnInit(): void {
    const data = this.s.getCurrentUser();
    let birthday = data.birthdate.toString();
    birthday = birthday.substr(4, 4) + '-' + birthday.substr(2, 2) + '-' + birthday.substr(0, 2);
    this.data = [
      {
        name: 'Vorname',
        type: 'text',
        value: data.firstName,
        changeable: true
      },
      {
        name: 'Nachname',
        type: 'text',
        value: data.lastName,
        changeable: true
      },
      {
        name: 'Geburtstag',
        type: 'date',
        value: birthday,
        changeable: true
      },
      {
        name: 'Email',
        type: 'text',
        value: data.mail,
        changeable: true
      },
      {
        name: 'Telefonnummer',
        type: 'text',
        value: data.phoneNumber,
        changeable: true
      },
      {
        name: 'Passwort',
        type: 'password',
        value: data.password,
        changeable: false
      }
    ];
  }

}
