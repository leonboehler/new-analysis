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

  checkInput(): void {
    const content1 = (<HTMLInputElement>document.getElementById('idVorname')).value;
    const content2 = (<HTMLInputElement>document.getElementById('idNachname')).value;
    const content3 = (<HTMLInputElement>document.getElementById('idGeburtstag')).value;
    const content4 = (<HTMLInputElement>document.getElementById('idTelefonnummer')).value;
    const addressStreet = (<HTMLInputElement>document.getElementById('idAddressStreet')).value;
    const addressStreetNumber = (<HTMLInputElement>document.getElementById('idAddressStreetNumber')).value;
    const addressPostCode = (<HTMLInputElement>document.getElementById('idAddressPostCode')).value;
    const addressCity = (<HTMLInputElement>document.getElementById('idAddressCity')).value;
    const addressCountry = (<HTMLInputElement>document.getElementById('idAddressCountry')).value;
    const addressState = (<HTMLInputElement>document.getElementById('idAddressState')).value;
    const time1 = (<HTMLInputElement>document.getElementById('idTimeFrom')).value;
    const time2 = (<HTMLInputElement>document.getElementById('idTimeTo')).value;
    if (content1 == '' || content2 == '' || content3 == '' || content4 == ''
      || addressStreet == '' || addressStreetNumber == '' || addressPostCode == '' || addressCity == '' || addressCountry == '' || addressState == ''
      || time1 == '' || time2 == '') {
      document.getElementById('errorInput').innerHTML = '* Bitte lassen Sie keine Felder leer';
      let birthday = this.currentUserData.birthdate.toString();
      birthday = birthday.substr(4, 4) + '-' + birthday.substr(2, 2) + '-' + birthday.substr(0, 2);
      document.getElementById('idVorname').innerHTML = this.currentUserData.firstName;
      document.getElementById('idNachname').innerHTML = this.currentUserData.lastName;
      document.getElementById('idGeburtstag').innerHTML = birthday;
      document.getElementById('idTelefonnummer').innerHTML = this.currentUserData.phoneNumber;
      document.getElementById('idAddressStreet').innerHTML = this.currentUserData.address.street;
      document.getElementById('idAddressStreetNumber').innerHTML = this.currentUserData.address.streetNumber.toString();
      document.getElementById('idAddressPostCode').innerHTML = this.currentUserData.address.postCode.toString();
      document.getElementById('idAddressCity').innerHTML = this.currentUserData.address.city;
      document.getElementById('idAddressCountry').innerHTML = this.currentUserData.address.country;
      document.getElementById('idAddressState').innerHTML = this.currentUserData.address.state;
    } else if (/([0-9])/.test(content1) || /([0-9])/.test(content2)) {
      document.getElementById('errorInputUserData').innerHTML = '* Bitte keine Zahlen im Namen';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
    } else if (/([a-z])/.test(content4) || /([A-Z])/.test(content4)) {
      document.getElementById('errorInputUserData').innerHTML = '* Bitte keine Zeichen in der Telefonnummer';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
    } else if (/([0-9])/.test(addressStreet)) {
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen in der Straße';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
    } else if (addressPostCode.length != 5 || /([a-z])/.test(addressPostCode) || /([A-Z])/.test(addressPostCode)) {
      document.getElementById('errorInputAddressData').innerHTML = '* Überprüfen Sie Ihre Postleitzahl';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
    }else if(/([0-9])/.test(addressCity)){
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen in der Stadt';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
    }else if(/([0-9])/.test(addressCountry)){
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen im Land';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
    }else if(/([0-9])/.test(addressState)){
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen im Bundesland';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
    }else{
      console.log('Save')
      document.getElementById('errorInputUserData').innerHTML = '';
      document.getElementById('errorInputAddressData').innerHTML = '';
      document.getElementById('errorInput').innerHTML = '';
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
