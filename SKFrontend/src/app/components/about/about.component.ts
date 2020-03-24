import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { AdminInfo } from 'src/app/models/adminInfo';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  adminList: AdminInfo[];

  ngOnInit(): void {
    this.communicationService.getAdmins().subscribe(admins => {
      this.adminList = admins;
    });
  }

}
