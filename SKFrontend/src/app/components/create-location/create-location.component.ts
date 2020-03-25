import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {ExLocation} from '../../models/ExLocation';
import {Bucket} from '../../models/Bucket';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  currentBucket: Bucket;
  locations: Array<ExLocation>
  buckets: Array<Bucket>
  constructor(private communicationService: CommunicationService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.communicationService.locations().subscribe(locations => {
      this.locations = new Array<ExLocation>()
      locations.forEach(location => {
        const exLocation = new ExLocation()
        exLocation.locationInfo = location
        this.locations.push(exLocation)
      });
      console.log(locations)
    });
    this.communicationService.buckets().subscribe(buckets => {
      buckets.forEach(bucket => {
        this.locations.forEach(location => {
          console.log(bucket)
          console.log(location)
          if (location.locationInfo.uuid === bucket.locationId) {
            location.buckets.push(bucket)
          }
        });
      });
    });
    this.adminService.currentBucket.subscribe(bucket => {
      this.currentBucket = bucket;
    });
  }

  onEditBucketsClick(location: ExLocation) {
      this.adminService.setBuckets(location.buckets)
  }

  onEditBucketClick(bucket: Bucket) {
      this.adminService.setCurrentBucket(bucket)
  }

}
