import { Component, OnInit } from '@angular/core';
import { userData } from 'src/app/models/userData';
import {OrchestratorService} from '../../services/orchestrator.service';
import {Router} from '@angular/router';
import {CommunicationService} from "../../services/communication.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-admin-editing-user',
  templateUrl: './admin-editing-user.component.html',
  styleUrls: ['./admin-editing-user.component.css']
})
export class AdminEditingUserComponent implements OnInit {

  data: userData[];
  checked = false;
  user = this.communicationService.getEditUser();

  onTimeChanged(times: Array<string>){
    //this.user.operationalReadiness = times;

  }

  constructor(private orchestratorService: OrchestratorService, private communicationService:CommunicationService, private router: Router) {

  }
  getBirthday(): {value: string}{
    let birthday = this.user.birthdate.toString();
    birthday = birthday.substr(4, 4) + '-' + birthday.substr(2, 2) + '-' + birthday.substr(0, 2);
    return {
      value: birthday
    };
  }
  setRolle() {
    this.checked = !this.checked;
    console.log(this.checked);
    if(this.checked == false) {
      this.user.role = 'user';
    }
    else{
      this.user.role = 'admin';
    }
  }



  onClickSafe() {
    console.log(this.checked)
    const firstname = (<HTMLInputElement>document.getElementById('input_firstname')).value
    const name = (<HTMLInputElement>document.getElementById('input_name')).value
    const email = (<HTMLInputElement>document.getElementById('input_email')).value
    const birthday = (<HTMLInputElement>document.getElementById('input_birthday')).value
    const telNumber = (<HTMLInputElement>document.getElementById('input_telnumber')).value
    const password = (<HTMLInputElement>document.getElementById('input_password')).value
    const passwordConfirm = (<HTMLInputElement>document.getElementById('input_password_confirm')).value
    const street = (<HTMLInputElement>document.getElementById('input_street')).value
    const streetNumber = (<HTMLInputElement>document.getElementById('input_streetNumber')).value
    const postcode = (<HTMLInputElement>document.getElementById('input_postcode')).value
    const city = (<HTMLInputElement>document.getElementById('input_city')).value
    const state = (<HTMLInputElement>document.getElementById('input_state')).value
    const country = (<HTMLInputElement>document.getElementById('input_country')).value

    if (firstname == '') {
      alert("Bitte Vornamen angeben!")
    } else if (name == '') {
      alert("Bitte Nachname angeben!")
    } else if (email == '') {
      alert("Bitte Email angeben! (Format: example@test.de")
    } else if (birthday == '') {
      alert("Bitte Geburtsdatum angeben!")
    } else if (telNumber == '') {
      alert("Bitte Telefonnumme angeben!")
    } else if (password == '') {
      alert("Bitte Password setzen! (mind. 8 Zeichen; mind. ein Groß-/Kleinbuchstabe; mind. eine Ziffer)")
    } else if (passwordConfirm == '') {
      alert("Bitte Password bestätigen! (mind. 8 Zeichen; mind. ein Groß-/Kleinbuchstabe; mind. eine Ziffer)")
    } else if (street == '') {
      alert("Bitte Straße angeben!")
    } else if (streetNumber == '') {
      alert("Bitte Hausnummer angeben!")
    } else if (postcode == '') {
      alert("Bitte Postleitzahl angeben!")
    } else if (city == '') {
      alert("Bitte Stadt angeben!")
    } else if (state == '') {
      alert("Bitte Bundesland angeben!")
    } else {
      console.log("Could read all parameters")

      var strPassword = password.toString();
      var strPasswordConfirm = passwordConfirm.toString();
      if (!this.orchestratorService.validName(firstname)) {
        alert("Vorname darf nur aus Buchstaben (und '-') bestehen!");
      } else if (!this.orchestratorService.validName(name)) {
        alert("Nachname darf nur aus Buchstaben (und '-') bestehen!");
      } else if (!this.orchestratorService.validBirthday(birthday)) {
        alert("Registrierung nur bei Volljährigkeit!");
      } else if (!this.orchestratorService.validNumber(telNumber)) {
        alert("Telefonnummer darf nur aus Zahlen bestehen!");
      } else if (!this.orchestratorService.validPassword(password)) {
        console.log(!this.orchestratorService.validPassword(password))
        alert("Passwort erfüllt nicht Anforderungen (mind. 8 Zeichen; mind. ein Groß-/Kleinbuchstabe; mind. eine Ziffer)");
      } else if (strPasswordConfirm === strPassword == false) {
        alert("Passwörter müssen übereinstimmen!");
      } else if (!this.orchestratorService.validName(street)) {
        alert("Straße darf nur aus Buchstaben (und '-') bestehen!");
      } else if (!this.orchestratorService.validNumber(streetNumber)) {
        alert("Hausnummer darf nur aus Zahlen bestehen!");
      } else if (!this.orchestratorService.validPostcode(postcode)) {
        alert("Postleitzahl darf nur aus Zahlen bestehen und muss fünf Zeichen lang sein!");
      } else if (!this.orchestratorService.validName(city)) {
        alert("Stadt darf nur aus Buchstaben bestehen!");
      } else if (!this.orchestratorService.validName(state)) {
        alert("Bundesland darf nur aus Buchstaben bestehen!");
      } else {
        //Daten können User übergeben werden
        //Danach dann Datanbank übergeben und Seite Wechseln
        // this.router.navigate(['/admin']);

      }
    }
    return false;
  }

  ngOnInit(): void {
  }

}
