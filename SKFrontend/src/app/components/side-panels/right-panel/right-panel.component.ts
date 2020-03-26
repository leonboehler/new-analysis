import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../../services/communication.service';
import { OrchestratorService } from '../../../services/orchestrator.service'
import {Bucket} from '../../../models/Bucket';
import { from } from 'rxjs';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  buckets: Bucket[];
  selectedBucket: Bucket;
  noBucketSelected:Boolean = true;


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
      console.log(bucket)
    })
  }

  closeSideBar() {
    //De-select bucket thus closing sidebar
    this.orchestratorService.bucketSelected(null);
  }

}
