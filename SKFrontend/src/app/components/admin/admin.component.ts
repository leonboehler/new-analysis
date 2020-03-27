import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private communicationService:CommunicationService) { this.createList() }
  test = new Array();

  edit(){

  }

  createList(){
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
