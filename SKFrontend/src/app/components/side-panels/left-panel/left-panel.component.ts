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
  clickedItem: number;
  hoveredOverItem: number;
  hover: boolean;

  ngOnInit(): void {
    this.communicationService.allbuckets.subscribe(buckets => {
      this.buckets = buckets;
    });
    this.orchestratorService.selectedBucket.subscribe(bucket => {
      this.selectedBucket = bucket;
      if (this.selectedBucket != null) {
        this.clickedItem = this.selectedBucket.id;
        this.hoveredOverItem = this.selectedBucket.id;
      } else {
        this.clickedItem = null;
        this.hoveredOverItem = null;
      }
    });
  }

  selectBucket(item: number, bucket: Bucket) {
    this.highlight(item);
    this.orchestratorService.bucketSelected(bucket);
  }

  highlight(item: number) {
    this.clickedItem = item;
  }

  pointerOver(id: number) {
    this.hover = true;
    this.hoveredOverItem = id;
  }

  pointerLeave() {
    if (!(this.hoveredOverItem === this.clickedItem)) {
      this.hover = false;
    }
  }
}
