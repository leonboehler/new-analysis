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
  buckets: Bucket[];
  selectedBucket: Bucket;

  constructor(
    private communicationService: CommunicationService,
    private orchestratorService: OrchestratorService
  ) { }

  ngOnInit(): void {
    this.communicationService.buckets().subscribe(buckets => {
      this.buckets = buckets;
    });
    this.orchestratorService.selectedBucket.subscribe(bucket => {
      this.selectedBucket = bucket;
      console.log(bucket);
    });
  }

  selectBucket(bucket: Bucket) {
    this.orchestratorService.bucketSelected(bucket);
  }
}
