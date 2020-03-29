import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';

import {Bucket} from '../../models/Bucket';
import {Position} from '../../models/Position';
import {AdminService} from '../../services/admin.service';
import {range} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Location} from '../../models/Location';
import {Station} from '../../models/Station';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  currentBucket: Bucket;
  locations: Array<Location>;
  createdBuckets: Array<Bucket>;
  editedLocation: Location;
  editingBuckets = false;

  currentPoint: Position;
  createdRoutePoints: Array<Position>;
  editingRoutePoints = false;

  stationIds: Array<number>
  constructor(private communicationService: CommunicationService, private adminService: AdminService) {this.locations = new Array<Location>();}

  ngOnInit(): void {
    this.communicationService.alllocations.subscribe(locations => {
      this.locations = new Array<Location>();
      locations.forEach(location => {
        this.locations.push(location);

        this.communicationService.allbuckets.subscribe(buckets => {

          this.locations.forEach(loc => {
            loc.buckets = new Array<Bucket>()
            buckets.forEach(bucket => {
              if (loc.id === bucket.locationId) {

                loc.buckets.push(bucket);
              }
            });
          });

        });
      });
    });

    this.communicationService.allstations.subscribe(stations => {
      this.stationIds = new Array<number>()
      stations.forEach(station => {
        this.stationIds.push(station.id)
      })
    })

    this.adminService.currentBucket.subscribe(bucket => {
      this.currentBucket = bucket;
    });

    this.adminService.createdBuckets.subscribe(buckets => {
      this.createdBuckets = buckets;

    });

    this.adminService.selectedLocation.subscribe(location => {
      if (this.locations == null) { return; }
      if (location == null) {
        range(0, this.locations.length).subscribe(index => {
            this.locations[index].expanded = false;
        });
        return;
      }
      range(0, this.locations.length).subscribe(index => {
        if (this.locations[index].id === location.id) {
          this.locations[index].expanded = true;
        } else {
          this.locations[index].expanded = false;
        }
      });
    });

    this.adminService.routePoints.subscribe(points => {
      this.createdRoutePoints = points;
    });

    this.adminService.currentPoint.subscribe(point => {
      this.currentPoint = point;
    });
  }

  panelOpened(location: Location) {
    console.log("Panel Openned")
    console.log(location)
    this.editedLocation = location;
    this.adminService.setSelectedLocation(location);
  }

  panelClosed(location: Location) {
    console.log("Zu speichernde Location")
    console.log(this.editedLocation)
    if(this.editedLocation.id==null) {
      this.communicationService.createLocation(this.editedLocation).subscribe(result => {
        if (result.success) {
         this.communicationService.fetchAll()
        }
      });
    }
      this.adminService.setSelectedLocation(null);
      this.editingBuckets = false;
      this.adminService.setDrawMode('none');
      this.adminService.setCurrentBucket(null);
      this.adminService.setBuckets(new Array<Bucket>());

  }
  onEditBucketsClick() {
      this.editingBuckets = true;
      this.adminService.setDrawMode('bucket');
      this.adminService.setBuckets(this.editedLocation.buckets);
  }

  onEditBucketClick(bucket: Bucket) {
      this.adminService.setCurrentBucket(bucket);
      this.createdRoutePoints = this.editedLocation.locationMarkers;
  }

  onInput(event) {
    const id = (event.target as Element).id;

    switch (id) {
      case 'input_location_chipId': this.editedLocation.chipId = Number(event.target.value); break;
      case 'input_location_city': this.editedLocation.city = event.target.value; break;
      case 'input_location_state': this.editedLocation.state = event.target.value; break;
      case 'input_location_location_length': this.editedLocation.routeLength = event.target.value; break;

      case 'input_bucket_chipId': this.currentBucket.chipId = Number(event.target.value); break;
      case 'input_bucket_name': this.currentBucket.name = event.target.value; break;
      case 'input_bucket_maxFrogs': this.currentBucket.frogAmountMax = Number(event.target.value); break;
      case 'input_bucket_latitude': this.currentBucket.position.latitude = Number(event.target.value); break;
      case 'input_bucket_longitude': this.currentBucket.position.longitude = Number(event.target.value); break;
    }

    this.adminService.setCurrentBucket(this.currentBucket);
  }

  saveBuckets() {
      console.log(this.editedLocation.buckets[0].chipId.constructor.name)
      this.adminService.setCurrentBucket(null);
      this.adminService.setBuckets(new Array<Bucket>());
      this.editingBuckets = false;
      this.adminService.setDrawMode('none');
  }

  onNewBucket() {
    let position: Position;
    if(this.editedLocation.locationMarkers.length!=0)position = this.editedLocation.locationMarkers[0];
    else position = {latitude: 0,longitude: 0}
    const bucket = new Bucket(0,position , this.editedLocation.street);
    let maxId = 0
    this.createdBuckets.forEach(buc => {
      if(buc.id>=maxId){
        maxId = buc.id+1
      }
      bucket.id = maxId
    })
    console.log(bucket.id)
    this.adminService.addBucket(bucket);
    this.adminService.setCurrentBucket(bucket);

  }

  onDeleteBucket() {
    this.adminService.removeBucket(this.currentBucket);
  }

  onEditRoutePoints() {
    this.editingRoutePoints = true;
    this.createdRoutePoints = this.editedLocation.locationMarkers;
    this.adminService.setRoutePoints(this.createdRoutePoints);
    this.adminService.setDrawMode('location');
  }

  reorderedPoints(event: CdkDragDrop<Position[]>) {
      moveItemInArray(this.createdRoutePoints, event.previousIndex, event.currentIndex);
      this.adminService.setRoutePoints(this.createdRoutePoints);
    }

    onPositionClick(position: Position) {
        this.adminService.setCurrentPoint(position);
        console.log('clicked');
    }

    onDeletePoint() {
        console.log(this.currentPoint);
        this.adminService.removePoint(this.currentPoint);
    }

  savePoints() {
      this.adminService.setRoutePoints(null);
      this.adminService.setDrawMode('none');
      this.editingRoutePoints = false;
  }

  onInputPoint(event) {
    const id = (event.target as Element).id;
    switch (id) {
      case 'input_point_latitude': this.currentPoint.latitude = Number(event.target.value); break;
      case 'input_point_longitude': this.currentPoint.longitude = Number(event.target.value); break;
      }
    this.adminService.setCurrentPoint(this.currentPoint);
  }

  onAddPoint() {
      let point: Position;
      if (this.createdRoutePoints.length!=0) {
        const lat = this.createdRoutePoints[this.createdRoutePoints.length - 1].latitude + 0.001;
        const long = this.createdRoutePoints[this.createdRoutePoints.length - 1].longitude + 0.001;

        point = new Position(lat, long);
      } else {
        point = new Position(0, 0);
      }

      this.createdRoutePoints.push(point);
      this.adminService.setRoutePoints(this.createdRoutePoints);
  }

  onNewLocationClick(){

    const location = new Location()
    location.locationMarkers = []
    location.buckets = []
    this.locations.push(location)
    this.adminService.setBuckets(new Array<Bucket>());

  }
  stationChanged(event){
    console.log('Changed')
    console.log(event)
    if(!event.isUserInput){
      console.log(event.source.value)
      this.editedLocation.stationId = event.source.value;
    }

  }

  onSave(){

  }

}
