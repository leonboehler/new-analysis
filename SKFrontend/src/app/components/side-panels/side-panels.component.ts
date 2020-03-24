import {Component, OnInit} from '@angular/core';

import {CommunicationService} from '../../services/communication.service';
import {Bucket} from '../../models/Bucket';

/**
 * @title SidePanels as a List
 */
@Component({
  selector: 'app-side-panels',
  templateUrl: './side-panels.component.html',
  styleUrls: ['./side-panels.component.css'],
})
export class SidePanelsComponent implements OnInit {
  buckets: Bucket[];

  constructor(
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.communicationService.buckets().subscribe(buckets => {
      this.buckets = buckets;
    });
  }
}
