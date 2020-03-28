import { Component, OnInit, ViewChild } from '@angular/core';
import { userData } from 'src/app/models/userData';
import {OrchestratorService} from '../../services/orchestrator.service';
import {Router} from '@angular/router';
import { User } from 'src/app/models/User';
import {Address} from '../../models/Address';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  saveData: User;
  showLocSelection = false;
  currentUserData = this.oservice.getCurrentUser();

  constructor(private oservice: OrchestratorService, private router: Router) {
    console.log(this.currentUserData);
  }

  checkInput(): void {
    let valid = true;
    const firstName = (document.getElementById('idFirstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('idLastName') as HTMLInputElement).value;
    const birthday = (document.getElementById('idBirthday') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('idPhoneNumber') as HTMLInputElement).value;
    const addressStreet = (document.getElementById('idAddressStreet') as HTMLInputElement).value;
    const addressStreetNumber = (document.getElementById('idAddressStreetNumber') as HTMLInputElement).value;
    const addressPostCode = (document.getElementById('idAddressPostCode') as HTMLInputElement).value;
    const addressCity = (document.getElementById('idAddressCity') as HTMLInputElement).value;
    const addressCountry = (document.getElementById('idAddressCountry') as HTMLInputElement).value;
    const addressState = (document.getElementById('idAddressState') as HTMLInputElement).value;
    if (firstName == '' || lastName == '' || birthday == '' || phoneNumber == ''
      || addressStreet == '' || addressStreetNumber == '' || addressPostCode == ''
      || addressCity == '' || addressCountry == '' || addressState == '') {
      document.getElementById('errorInput').innerHTML = '* Bitte lassen Sie keine Felder leer';
      valid = false;
    } else if (/([0-9])/.test(firstName) || /([0-9])/.test(lastName)) {
      document.getElementById('errorInputUserData').innerHTML = '* Bitte keine Zahlen im Namen';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
      valid = false;
    } else if (/([a-z])/.test(phoneNumber) || /([A-Z])/.test(phoneNumber)) {
      document.getElementById('errorInputUserData').innerHTML = '* Bitte keine Zeichen in der Telefonnummer';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
      valid = false;
    } else {
      document.getElementById('errorInputUserData').innerHTML = '';
    }

    if (/([0-9])/.test(addressStreet)) {
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen in der Straße';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
      valid = false;
    } else if (addressPostCode.length != 5 || /([a-z])/.test(addressPostCode) || /([A-Z])/.test(addressPostCode)) {
      document.getElementById('errorInputAddressData').innerHTML = '* Überprüfen Sie Ihre Postleitzahl';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
      valid = false;
    } else if (/([0-9])/.test(addressCity)) {
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen in der Stadt';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
      valid = false;
    } else if (/([0-9])/.test(addressCountry)) {
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen im Land';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
      valid = false;
    } else if (/([0-9])/.test(addressState)) {
      document.getElementById('errorInputAddressData').innerHTML = '* Bitte keine Zahlen im Bundesland';
      document.getElementById('errorInput').innerHTML = '* Bitte überprüfen Sie Ihre Eingabe';
      valid = false;
    } else {
      document.getElementById('errorInputAddressData').innerHTML = '';
    }

    if (valid) {
      // TODO: Save data to database
      console.log('Saving data...');
      const birthdate = Number(birthday.substr(8, 2) + birthday.substr(5, 2) + birthday.substr(0, 4));
      const mail = this.oservice.getCurrentUser().mail;
      const password = this.oservice.getCurrentUser().password;
      const role = this.oservice.getCurrentUser().role;
      const operationalReadiness = this.oservice.getCurrentUser().operationalReadiness;
      const assignedLocations = this.oservice.getCurrentUser().assignedLocations;

      const address: Address = {
        street: addressStreet,
        streetNumber: addressStreetNumber,
        postCode: addressPostCode,
        city: addressCity,
        state: addressState,
        country: addressCountry
      };

      this.saveData = {
        firstName,
        lastName,
        birthdate,
        mail,
        phoneNumber,
        password,
        role,
        operationalReadiness,
        address,
        assignedLocations
      };

      console.log(this.saveData);
      document.getElementById('errorInputUserData').innerHTML = '';
      document.getElementById('errorInputAddressData').innerHTML = '';
      document.getElementById('errorInput').innerHTML = '';
    }
  }

  getName(): {name1: string; name2: string; value1: any; value2: any} {
    const name = {
      name1: 'Vorname',
      name2: 'Nachname',
      value1: this.currentUserData.firstName,
      value2: this.currentUserData.lastName
    };
    return name;
  }

  getPhoneNumber(): {name: string; value: string} {
    return {
      name: 'Telefonnummer',
      value: this.currentUserData.phoneNumber
    };
  }


  getBirthday(): {name: string; value: string} {
    let birthday = this.currentUserData.birthdate.toString();
    birthday = birthday.substr(4, 4) + '-' + birthday.substr(2, 2) + '-' + birthday.substr(0, 2);
    return {
      name: 'Geburtstag',
      value: birthday
    };
  }

  getStreetAndNumber(): {name1: string; name2: string; value1: any; value2: any} {
    const address = {
          name1: 'Straße',
          name2: 'Nummer',
          value1: this.currentUserData.address.street,
          value2: this.currentUserData.address.streetNumber
        };
    return address;
  }

  getPostCodeAndCity(): {name1: string; name2: string; value1: any; value2: any} {
    const address = {
      name1: 'PLZ',
      name2: 'Stadt',
      value1: this.currentUserData.address.postCode,
      value2: this.currentUserData.address.city
    };
    return address;
  }

  getCountryAndState(): {name1: string; name2: string; value1: any; value2: any} {
    const address = {
      name1: 'Land',
      name2: 'Bundesland',
      value1: this.currentUserData.address.country,
      value2: this.currentUserData.address.state
    };
    return address;
  }

  onTimesSelected(times: Array<string>) {
    console.log(times);
  }

  onLocSelectionClick() {

    this.showLocSelection = true;
  }

  onLocSelectionValueChanged(locations: Array<string>) {
    this.showLocSelection = false;
    console.log(locations);
  }

  updatePassword(): void {
    this.router.navigate(['updatePassword']);
  }

  ngOnInit(): void {}

}
