import { Component, OnInit, ViewChild } from '@angular/core';
import { userData } from 'src/app/models/userData';
import {OrchestratorService} from '../../services/orchestrator.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  data: userData[];
  currentUserData = this.oservice.getCurrentUser();

  constructor(private oservice: OrchestratorService, private router: Router) {}

  checkInput(): void{
    const content1 = (<HTMLInputElement> document.getElementById('idVorname')).value;
    const content2 = (<HTMLInputElement> document.getElementById('idNachname')).value;
    const content3 = (<HTMLInputElement> document.getElementById('idGeburtstag')).value;
    const content4 = (<HTMLInputElement> document.getElementById('idEmail')).value;
    const content5 = (<HTMLInputElement> document.getElementById('idTelefonnummer')).value;
    const address1 = (<HTMLInputElement> document.getElementById('idAddress0')).value;
    const address2 = (<HTMLInputElement> document.getElementById('idAddress1')).value;
    const address3 = (<HTMLInputElement> document.getElementById('idAddress2')).value;
    console.log(content1);
    document.getElementById('idVorname').innerHTML = ' ass';
    if(content1 == '' || content2 == '' || content3 == '' || content4 == '' || content5 == '' ||
      address1 == '' || address2 == '' || address3 == ''){
      document.getElementById('errorInput').innerHTML = 'Bitte lassen Sie keine Felder leer';
      let birthday = this.currentUserData.birthdate.toString();
      birthday = birthday.substr(4, 4) + '-' + birthday.substr(2, 2) + '-' + birthday.substr(0, 2);
      document.getElementById('idVorname').innerHTML = this.currentUserData.firstName;
      document.getElementById('idNachname').innerHTML = this.currentUserData.lastName;
      document.getElementById('idGeburtstag').innerHTML = birthday;
      document.getElementById('idEmail').innerHTML = this.currentUserData.mail;
      document.getElementById('idTelefonnummer').innerHTML = this.currentUserData.phoneNumber;
      document.getElementById('idAddress0').innerHTML = this.currentUserData.address.street + ' ' + this.currentUserData.address.streetNumber;
      document.getElementById('idAddress1').innerHTML = this.currentUserData.address.postCode + ' ' + this.currentUserData.address.city;
      document.getElementById('idAddress2').innerHTML = this.currentUserData.address.country + ', ' + this.currentUserData.address.state;
    }else{
      console.log('Save');
    }
  }

  getAvailableTime(): string[]{
    return [ "2020-03-23 17:18:11", "2020-03-23 18:00:00" ];
  }

  getAddress(): string[] {
    const contentAddress: string[] = [];
    contentAddress.push(this.currentUserData.address.street + ' ' + this.currentUserData.address.streetNumber);
    contentAddress.push(this.currentUserData.address.postCode + ' ' + this.currentUserData.address.city);
    contentAddress.push(this.currentUserData.address.country + ', ' + this.currentUserData.address.state);

    return contentAddress;
  }

  updatePassword(): void {
    this.router.navigate(['updatePassword']);
  }

  ngOnInit(): void {
    let birthday = this.currentUserData.birthdate.toString();
    birthday = birthday.substr(4, 4) + '-' + birthday.substr(2, 2) + '-' + birthday.substr(0, 2);
    this.data = [
      {
        name: 'Vorname',
        type: 'text',
        value: this.currentUserData.firstName,
        changeable: true
      },
      {
        name: 'Nachname',
        type: 'text',
        value: this.currentUserData.lastName,
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
        value: this.currentUserData.mail,
        changeable: true
      },
      {
        name: 'Telefonnummer',
        type: 'text',
        value: this.currentUserData.phoneNumber,
        changeable: true
      },
      {
        name: 'Passwort',
        type: 'password',
        value: this.currentUserData.password,
        changeable: false
      }
    ];
  }

}
