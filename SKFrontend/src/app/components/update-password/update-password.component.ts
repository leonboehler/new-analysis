import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {OrchestratorService} from "../../services/orchestrator.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})

export class UpdatePasswordComponent implements OnInit {
  valid = false;
  newPassword = '';
  constructor(private oservice: OrchestratorService, private router: Router) { }

  backToSettings(): void{
    this.router.navigate(['settings']);
  }

  checkPassword(): void {
    const oldPassword = (<HTMLInputElement>document.getElementById('oldPassword')).value;
    const currentPassword = this.oservice.getCurrentUser().password;
    this.checkNewPassword(oldPassword);

    if(oldPassword != currentPassword) {
      document.getElementById('errorOldPassword').innerHTML = '* Das Passwort muss mit Ihrem aktuellen Passwort übereinstimmen';
      this.valid = false;
    }else{
      document.getElementById('errorOldPassword').innerHTML = '';
    }

    if(this.valid){
      // TODO: Save password to databse
      console.log(this.newPassword);
      document.getElementById('errorOldPassword').innerHTML = '';
    }else{
      // Don't save to database
      this.newPassword = '';
    }
  }

  checkNewPassword(oldPassword): void {
    const newPassword = (<HTMLInputElement>document.getElementById('newPassword')).value;
    const newPasswordRepeat = (<HTMLInputElement>document.getElementById('newPasswordRepeat')).value;

    if (newPassword != newPasswordRepeat) {
      this.valid = false;
      document.getElementById('errorNewPassword').innerHTML = '* Die Passw&ouml;rter m&uuml;ssen &uuml;bereinstimmen';
    } else if (newPassword == '' || newPasswordRepeat == '') {
      this.valid = false;
      document.getElementById('errorNewPassword').innerHTML = '* Passw&ouml;rter d&uuml;rfen nicht leer sein';
    } else if (newPassword.length < 8) {
      this.valid = false;
      document.getElementById('errorNewPassword').innerHTML = '* Passwort muss mindestens 8 Zeichen lang sein, große und kleine Buchstaben und mindestens eine Zahl enthalten';
    } else if (!(/^(?=.{8})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/.test(newPasswordRepeat))) {
      this.valid = false;
      document.getElementById('errorNewPassword').innerHTML = '* Passwort muss mindestens 8 Zeichen lang sein, große und kleine Buchstaben und mindestens eine Zahl enthalten';
    }else if(newPasswordRepeat == oldPassword){
      this.valid = false;
      document.getElementById('errorNewPassword').innerHTML = '* Passwort darf nicht dem alten Passwort entsprechen';
    }else {
      this.valid = true;
      document.getElementById('errorNewPassword').innerHTML = '';
      this.newPassword = newPassword;
    }
  }

  ngOnInit(): void {

  }

}
