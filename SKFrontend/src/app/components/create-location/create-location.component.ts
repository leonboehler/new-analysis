import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  constructor() {private communicationService: CommunicationService}
  locName = 'Location1'
  ngOnInit(): void {
    this.
  }

}
