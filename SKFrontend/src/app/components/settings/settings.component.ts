import { Component, OnInit, ViewChild } from '@angular/core';
import { userData } from 'src/app/models/userData';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  data: userData[];

  constructor() {}

  // NICHT BEACHTEN
  /*@ViewChild("sss")
  inp: HTMLInputElement;
  */

  /*saveNewInput(): void{
    console.log("Saving...");
  }*/

  ngOnInit(): void {
    this.data = [
      {
        name: 'Name',
        type: 'text',
        value: 'Keine Ahnung',
        changeable: true
      },
      {
        name: 'Passwort',
        type: 'password',
        value: 'KeineAhnung',
        changeable: true
      },
      {
        name: 'Email',
        type: 'text',
        value: 'testmail@web.de',
        changeable: false
      },
      {
        name: 'Geburtstag',
        type: 'text',
        value: '04.02.1969',
        changeable: true
      },
      {
        name: 'Telefonnummer',
        type: 'text',
        value: '01718337498',
        changeable: true
      },
      {
        name: 'PLZ',
        type: 'text',
        value: '88045',
        changeable: true
      },
      {
        name: 'Wohnort',
        type: 'text',
        value: 'Friedrichshafen',
        changeable: true
      },
      {
        name: 'Bundesland',
        type: 'text',
        value: 'Baden-Würtemberg',
        changeable: true
      }
    ];
  }

}
