import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import {Router} from "@angular/router";
import {OrchestratorService} from "../../services/orchestrator.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private communicationService:CommunicationService, private orchestratorService: OrchestratorService, private router: Router) { this.createList() }
  test = new Array();

  edit(user){
    console.log(user.firstName);
    this.orchestratorService.setEditUser(user);
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
  onClickStation(){
    this.router.navigate(['/stationCreate']);
  }
  onClickLocation(){
    this.router.navigate(['/locCreate']);
  }
  ngOnInit(): void {
  }

}
