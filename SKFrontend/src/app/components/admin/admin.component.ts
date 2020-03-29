import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private communicationService:CommunicationService, private router: Router) { this.createList() }
  test = new Array();

  edit(user){
    console.log(user.firstName);
    //TODO: open editing panel with user data
    this.communicationService.setEditUser(user);
    this.router.navigate(['/adminEditingUser']);

  }

  //TODO: change currentUser/getAdmins with all for example getAllUsers()

  createList(){
    this.communicationService.currentUser().subscribe(response =>{

        this.test.push(response);

    })
    return false;
  }

  createLise(){
    this.communicationService.getAdmins().subscribe(response =>{
      for (var i = 0; i < response.length; i++){
        this.test.push(response[i]);
      }
    })
    return false;
  }
  ngOnInit(): void {
  }

}
