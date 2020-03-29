import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../../services/communication.service';
import {OrchestratorService} from '../../../services/orchestrator.service';
import {Bucket} from '../../../models/Bucket';

/**
 * @title RightSidePanel
 * @description Shows detailed information about the selectedBucket and gives the user the option to reserve it
 */
@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  /**
   * @brief Class for the functionality of the right side bar
   * @implements OnInit
   */
  selectedBucket: Bucket;


  /**
   * @brief Constructor for setting up the orchestratorService
   * @param orchestratorService
   * @see orchestratorService
   */
  constructor(
    private orchestratorService: OrchestratorService
  ) {
  }

  ngOnInit(): void {
    /**
     * @brief Subscription to selectedBucket
     * @description subscribe to selectedBucket using the orchestrator service to get access to all of its attributes
     * @see Bucket
     * @see orchestratorService
     */
    this.orchestratorService.selectedBucket.subscribe(bucket => {
      this.selectedBucket = bucket;
      console.log(bucket);
    });
  }

  closeSideBar() {
    /**
     * @brief Deselect bucket thus closing the sidebar
     */
    this.orchestratorService.bucketSelected(null);
  }

  reserveBucket() {
    /**
     * @brief Reserve the selectedBucket
     */
    this.selectedBucket.reserved = true;
  }
}
