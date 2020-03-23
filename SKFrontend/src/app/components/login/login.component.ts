import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service'
import { OrchestratorService } from '../../services/orchestrator.service'
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


  loginUser(event){
    event.preventDefault()


    const username = event.target.querySelector('#username').value
    const password = event.target.querySelector('#password').value

    if(!this.orchestratorService.validEmail(username)){
      alert("Entered wrong e-mail.")

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

    console.log(username, +' '+ password)

  }




}
