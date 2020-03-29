import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {CommunicationService} from '../../services/communication.service';
import {Station} from '../../models/Station';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css']
})
export class CreateStationComponent implements OnInit {

  stations: Array<Station>

  constructor(private adminService: AdminService, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.allstations.subscribe(stations => {
      this.stations = stations
    })
  }

  panelOpened(station: Station){

  }

  panelClosed(station: Station){

  }

  onInput(event){

  }

}
