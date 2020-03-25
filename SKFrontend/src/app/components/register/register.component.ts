import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { CommunicationService } from '../../services/communication.service';
import { OrchestratorService } from '../../services/orchestrator.service';
import { Router } from '@angular/router';
import {ifError} from "assert";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private orchestratorService:OrchestratorService, private router: Router) { }


  onClickRegister() {
    const firstname = (<HTMLInputElement> document.getElementById('input_firstname')).value
    const name = (<HTMLInputElement> document.getElementById('input_name')).value
    const email = (<HTMLInputElement> document.getElementById('input_email')).value
    const birthday = (<HTMLInputElement> document.getElementById('input_birthday')).value
    const telNumber = (<HTMLInputElement> document.getElementById('input_telnumber')).value
    const password = (<HTMLInputElement> document.getElementById('input_password')).value
    const passwordConfirm = (<HTMLInputElement> document.getElementById('input_password_confirm')).value
    const street = (<HTMLInputElement> document.getElementById('input_street')).value
    const streetNumber = (<HTMLInputElement> document.getElementById('input_streetNumber')).value
    const postcode = (<HTMLInputElement> document.getElementById('input_postcode')).value
    const city = (<HTMLInputElement> document.getElementById('input_city')).value
    const state = (<HTMLInputElement> document.getElementById('input_state')).value
    const country = (<HTMLInputElement> document.getElementById('input_country')).value
    const agb = (<HTMLInputElement> document.getElementById('input_agb')).value

    console.log(birthday)

    if(firstname == ''){
      alert("Bitte Vornamen angeben!")
    }else if(name == ''){
      alert("Bitte Nachname angeben!")
    }else if(email == ''){
      alert("Bitte Email angeben! (Format: example@test.de")
    }else if(birthday == ''){
      alert("Bitte Geburtsdatum angeben!")
    }else if(telNumber == ''){
      alert("Bitte Telefonnumme angeben!")
    }else if(password == ''){
      alert("Bitte Password setzen! (mind. 8 Zeichen; mind. ein Groß-/Kleinbuchstabe; mind. eine Ziffer)")
    }else if(passwordConfirm == ''){
      alert("Bitte Password bestätigen! (mind. 8 Zeichen; mind. ein Groß-/Kleinbuchstabe; mind. eine Ziffer)")
    }else if(street == ''){
      alert("Bitte Straße angeben!")
    }else if(streetNumber == ''){
      alert("Bitte Hausnummer angeben!")
    }else if(postcode == ''){
      alert("Bitte Postleitzahl angeben!")
    }else if(city == ''){
      alert("Bitte Stadt angeben!")
    }else if(state == ''){
      alert("Bitte Bundesland angeben!")
    }else if(agb == 'false'){
      alert("Bitte AGB`s akzeptieren!")
    }else{
      console.log("Could read all parameters")

      if(!this.orchestratorService.validName(firstname)){
        alert("Vorname darf nur aus Buchstaben (und '-') bestehen!")
      }else if(!this.orchestratorService.validName(name)){
        alert("Nachname darf nur aus Buchstaben (und '-') bestehen!")
      }else if(!this.orchestratorService.validBirthday(birthday)){
        alert("Registrierung nur bei Volljährigkeit!")
      }else if(!this.orchestratorService.validNumber(telNumber)){
        alert("Telefonnummer darf nur aus Zahlen bestehen!")
      }else if(!this.orchestratorService.validPassword(password)){
        console.log(!this.orchestratorService.validPassword(password))
        alert("Das Passwort darf nur aus Groß-/Kleinbuchstaben und Zahlen bestehen")
      }else if(password == passwordConfirm){
        alert("Passwörter müssen übereinstimmen!")
      }else if(!this.orchestratorService.validName(street)){
        alert("Straße darf nur aus Buchstaben (und '-') bestehen!")
      }else if(!this.orchestratorService.validNumber(streetNumber)){
        alert("Hausnummer darf nur aus Zahlen bestehen!")
      }else if(!this.orchestratorService.validPostcode(postcode)){
        alert("Postleitzahl darf nur aus Zahlen bestehen und muss fünf Zeichen lang sein!")
      }else if(!this.orchestratorService.validName(city)){
        alert("Stadt darf nur aus Buchstaben bestehen!")
      }else if(!this.orchestratorService.validName(state)){
        alert("Bundesland darf nur aus Buchstaben bestehen!")
      }
    }




    return false;
    // this.router.navigate(['/map']);
  }
  ngOnInit(): void {
  }

}
