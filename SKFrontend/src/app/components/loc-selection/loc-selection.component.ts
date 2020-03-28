import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrchestratorService} from '../../services/orchestrator.service';
import {Location} from '../../models/Location';
import {User} from '../../models/User';
import {CommunicationService} from '../../services/communication.service';

@Component({
  selector: 'app-loc-selection',
  templateUrl: './loc-selection.component.html',
  styleUrls: ['./loc-selection.component.css']
})
export class LocSelectionComponent implements OnInit {

  @Input() assignedIds: Array<number>;
  selectedLocations = new Array<Location>();

  @Output() valueChanged = new EventEmitter()

  constructor(private orchestratorService: OrchestratorService, private communicationService: CommunicationService) {
  }

  ngOnInit(): void {
    this.assignedIds.forEach(id => {
      const location = this.orchestratorService.getLocationFromId(id)
      if (location !== null) {
        this.selectedLocations.push(location);
      }
    });

    this.orchestratorService.selectedLocation.subscribe(location => {
      const index = this.selectedLocations.indexOf(location)
      if (location != null && index === -1) {
        console.log(location)
        this.selectedLocations.push(location);
      }
    });
  }

  onDeleteButtonClick(index: number) {
    this.selectedLocations.splice(index, 1);
  }

  onSaveButtonClick() {
    this.valueChanged.emit(this.selectedLocations);
  }
}
