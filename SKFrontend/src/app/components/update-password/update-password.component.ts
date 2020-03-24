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
  constructor(private oservice: OrchestratorService, private router: Router) { }

  backToSettings(): void{
    this.router.navigate(['settings']);
  }

  checkOldPassword(): void{
    const oldPassword = document.getElementById('oldPassword').value;
    const currentPassword = this.oservice.getCurrentUser().password;
    this.checkNewPassword();
    if(oldPassword != currentPassword) {
      document.getElementById('errorOldPassword').innerHTML = 'Das Passwort muss mit Ihrem aktuellen Passwort übereinstimmen';
      this.valid = false;
    }else{
      this.valid = true;
    }
    if(this.valid){
      console.log('Everything is fine!');
      document.getElementById('errorOldPassword').innerHTML = '';
    }
  }

  checkNewPassword(): void{
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordRepeat = document.getElementById('newPasswordRepeat').value;
    if(newPassword != newPasswordRepeat){
      this.valid = false;
      document.getElementById('errorNewPassword').innerHTML = 'Die Passw&ouml;rter m&uuml;ssen &uuml;bereinstimmen';
    }else if(newPassword == '' || newPasswordRepeat == ''){
      this.valid = false;
      document.getElementById('errorNewPassword').innerHTML = 'Passw&ouml;rter d&uuml;rfen nicht leer sein';
    }else{
      this.valid = true;
      document.getElementById('errorNewPassword').innerHTML = '';
    }
  }

  ngOnInit(): void {

  }

}
