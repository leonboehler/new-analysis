import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { OrchestratorService } from '../../services/orchestrator.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private communicationService:CommunicationService, private orchestratorService:OrchestratorService, private router:Router) { }
  ngOnInit(): void {
  }

  onClickRegister(){

    this.router.navigate(['/register'])
  }

  registerUser(event){

  }


  onClickLogin(){

    const username = (<HTMLInputElement> document.getElementById('login_username')).value;
    const password = (<HTMLInputElement> document.getElementById('login_password')).value;

    if(!this.orchestratorService.validEmail(username)){


    }
    else if(!this.orchestratorService.validString(password)){
      alert("Entered wrong password.")
    }
    else {

      this.communicationService.login(username, password).subscribe(response =>{
        if(response == true){
          this.router.navigate(['/map'])
        }
        else{
          alert("Invalid data. Try again.")
        }
      })
    }

  }




}
