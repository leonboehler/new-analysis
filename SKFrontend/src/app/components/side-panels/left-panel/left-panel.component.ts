import {Component, OnInit} from '@angular/core';

import {CommunicationService} from '../../../services/communication.service';
import {OrchestratorService} from '../../../services/orchestrator.service';
import {Bucket} from '../../../models/Bucket';


/**
 * @title LeftSidePanel as a List
 * @description Shows all buckets and gives information about them, each item in the list is clickable,
 * this opens the right side panel
 */
@Component({
  selector: 'app-side-panels',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent implements OnInit {
  /**
   * @brief Class for the functionality of the left side bar
   * @implements OnInit
   */

  /**
   * @brief Constructor for setting up the orchestratorService and communicationService
   * @param communicationService
   * @param orchestratorService
   * @see orchestratorService
   * @see communicationService
   */
  constructor(
    private communicationService: CommunicationService,
    private orchestratorService: OrchestratorService
  ) {
  }

  buckets: Bucket[];
  selectedBucket: Bucket;
  clickedItem: string;
  hoveredOverItem: string;
  hover: boolean;

  ngOnInit(): void {
    /**
     * @brief Subscription to selectedBucket and buckets
     * @description subscribe to selectedBucket using the orchestratorService to gain access to all of its attributes.
     * Subscribe to buckets using the communicationService to gain access to all buckets in the system
     * @see Bucket
     * @see orchestratorService
     * @see communicationService
     */
    this.communicationService.buckets().subscribe(buckets => {
      this.buckets = buckets;
    });
    this.orchestratorService.selectedBucket.subscribe(bucket => {
      this.selectedBucket = bucket;
      // when a bucket is selected: sets the corresponding parameters and reverts it if it is deselected
      if (this.selectedBucket != null) {
        this.clickedItem = this.selectedBucket.id;
        this.hoveredOverItem = this.selectedBucket.id;
      } else {
        this.clickedItem = 'null';
        this.hoveredOverItem = 'null';
      }
    });
  }

  selectBucket(id: string, bucket: Bucket) {
    /**
     * @brief tells the orchestratorService which bucket is selceted and calls the function that highlights the item in the list
     * @param id: string containing the id of the bucket
     * @param bucket: Bucket object to tell to the orchestratorService
     * @see orchestratorService
     */
    this.highlight(id);
    this.orchestratorService.bucketSelected(bucket);
  }

  highlight(id: string) {
    /**
     * @brief Sets the item to highlight in the list if it is clicked
     * @param id: string containing the id of the bucket
     */
    this.clickedItem = id;
  }

  pointerOver(id: string) {
    /**
     * @brief Sets the item to highlight in the list if it is hovered over and activates hover mode
     * @param id: string containing the id of the bucket
     */
    this.hover = true;
    this.hoveredOverItem = id;
  }

  pointerLeave() {
    /**
     * @brief deactivates hover mode if the bucket hovered over is not the clicked one thus dehighlighting it
     */
    if (!(this.hoveredOverItem === this.clickedItem)) {
      this.hover = false;
    }
  }
}
