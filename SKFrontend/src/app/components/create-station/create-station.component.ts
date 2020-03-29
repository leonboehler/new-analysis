import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {CommunicationService} from '../../services/communication.service';
import {Station} from '../../models/Station';
import {Position} from '../../models/Position'

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css']
})
export class CreateStationComponent implements OnInit {

  stations: Array<Station>
  currentStation: Station
  constructor(private adminService: AdminService, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.allstations.subscribe(stations => {
      this.stations = stations
    })

    this.adminService.currentStation.subscribe(station => {
      this.currentStation = station
    })
  }

  panelOpened(station: Station){
      this.adminService.setDrawMode('station')

      this.currentStation = station
     this.adminService.setSelectedStation(station)
      this.adminService.setCurrentStation(station)

  }

  panelClosed(station: Station){
    console.log("Zu speichernde Station")
    console.log(this.currentStation)
    if(this.currentStation.id==null) {
      this.communicationService.createStation(this.currentStation).subscribe(result => {
        if (result.success) {
          this.communicationService.fetchAll()
        }
      });
    }

      this.adminService.setDrawMode('none')
     this.adminService.setCurrentStation(null)
  }

  onInput(event) {
    const id = (event.target as Element).id;

    switch (id) {
      case 'input_station_chipId':
        this.currentStation.chipId = Number(event.target.value);
        break;
      case 'input_station_longitude':
        this.currentStation.position.longitude = Number(event.target.value);
        break;
      case 'input_station_latitude':
        this.currentStation.position.latitude = Number(event.target.value);
        break;
    }
    this.adminService.setCurrentStation(this.currentStation)
  }
  addStation(){
    const station = new Station()
    station.chipId = 0
    station.position = {latitude: 0, longitude: 0}
    station.expanded = false
    station.battery = 0
    this.stations.push(station)

  }

}
