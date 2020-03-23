import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginUser(event){
    event.preventDefault()
    const username = event.target.querySelector('#username').value
    if(username.includes("@")){
      //Anfrage an Server
    }else{
      alert("Entered wrong e-mail.")
    }
    const password = event.target.querySelector('#password').value
    console.log(username, +' '+ password)
  }

}
