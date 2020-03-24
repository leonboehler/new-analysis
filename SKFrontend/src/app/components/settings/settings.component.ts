import { Component, OnInit, ViewChild } from '@angular/core';
import { userData } from 'src/app/models/userData';
import {OrchestratorService} from '../../services/orchestrator.service';
import {Router} from '@angular/router';

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

  getAvailableTime(): {name1: string; name2: string; value1: any; value2: any} {
    const time = {
      name1: 'Von',
      name2: 'Bis',
      value1: this.currentUserData.operationalReadiness.startTime,
      value2: this.currentUserData.operationalReadiness.endTime
    };
    return time;
  }

  getStreetAndNumber(): {name1: string; name2: string; value1: any; value2: any}{
    const address = {
          name1: 'Straße',
          name2: 'Nummer',
          value1: this.currentUserData.address.street,
          value2: this.currentUserData.address.streetNumber
        };
    return address;
  }

  getPostCodeAndCity(): {name1: string; name2: string; value1: any; value2: any}{
    const address = {
      name1: 'PLZ',
      name2: 'Stadt',
      value1: this.currentUserData.address.postCode,
      value2: this.currentUserData.address.city
    };
    return address;
  }

  getCountryAndState(): {name1: string; name2: string; value1: any; value2: any}{
    const address = {
      name1: 'Land',
      name2: 'Bundesland',
      value1: this.currentUserData.address.country,
      value2: this.currentUserData.address.state
    };
    return address;
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
        changeable: false
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
