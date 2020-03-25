import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {Location} from '../../models/Location';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  locations: Array<Location>
  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.communicationService.locations().subscribe(locations => {
      this.locations = locations;
    });
  }

}
