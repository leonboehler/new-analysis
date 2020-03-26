import {Component, OnInit} from '@angular/core';

import {CommunicationService} from '../../../services/communication.service';
import { OrchestratorService } from '../../../services/orchestrator.service';
import {Bucket} from '../../../models/Bucket';


/**
 * @title SidePanels as a List
 */
@Component({
  selector: 'app-side-panels',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent implements OnInit {

  constructor(
    private communicationService: CommunicationService,
    private orchestratorService: OrchestratorService
  ) { }
  buckets: Bucket[];
  selectedBucket: Bucket;
  clickedItem: string;
  hoveredOverItem: string;
  hover: boolean;

  ngOnInit(): void {
    this.communicationService.buckets().subscribe(buckets => {
      this.buckets = buckets;
    });
    this.orchestratorService.selectedBucket.subscribe(bucket => {
      this.selectedBucket = bucket;
      if (this.selectedBucket != null) {
        this.clickedItem = this.selectedBucket.id;
        this.hoveredOverItem = this.selectedBucket.id;
      } else {
        this.clickedItem = 'null';
        this.hoveredOverItem = 'null';
      }
    });
  }

  selectBucket(item: string, bucket: Bucket) {
    this.highlight(item);
    this.orchestratorService.bucketSelected(bucket);
  }

  highlight(item: string) {
    this.clickedItem = item;
  }

  pointerOver(id: string) {
    this.hover = true;
    this.hoveredOverItem = id;
  }

  pointerLeave() {
    if (!(this.hoveredOverItem === this.clickedItem)) {
      this.hover = false;
    }
  }
}
