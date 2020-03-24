import { Component, OnInit } from '@angular/core';
import {OrchestratorService} from '../../services/orchestrator.service';
import {Location} from '../../models/Location';

@Component({
  selector: 'app-loc-selection',
  templateUrl: './loc-selection.component.html',
  styleUrls: ['./loc-selection.component.css']
})
export class LocSelectionComponent implements OnInit {

  selectedLocations: Array<Location>;

  constructor(private orchestratorService: OrchestratorService) {}

  ngOnInit(): void {
    this.orchestratorService.selectedLocation.subscribe(location => {
      this.selectedLocations.push(location);
    });
  }
}
