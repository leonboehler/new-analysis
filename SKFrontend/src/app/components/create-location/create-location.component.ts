import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {ExLocation} from '../../models/ExLocation';
import {Bucket} from '../../models/Bucket';
import {Position} from '../../models/Position';
import {AdminService} from '../../services/admin.service';
import {range} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  currentBucket: Bucket;
  locations: Array<ExLocation>
  createdBuckets: Array<Bucket>
  editedLocation: ExLocation
  editingBuckets = false

  currentPoint: Position
  createdRoutePoints: Array<Position>
  editingRoutePoints = false
  constructor(private communicationService: CommunicationService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.communicationService.locations().subscribe(locations => {
      this.locations = new Array<ExLocation>()
      locations.forEach(location => {
        const exLocation = new ExLocation()
        exLocation.locationInfo = location
        this.locations.push(exLocation)
        this.communicationService.buckets().subscribe(buckets => {
          buckets.forEach(bucket => {
            this.locations.forEach(location => {
              if (location.locationInfo.uuid === bucket.locationId) {
                location.buckets.push(bucket)
              }
            });
          });
        });
      });
    });

    this.adminService.currentBucket.subscribe(bucket => {
      this.currentBucket = bucket;
    });

    this.adminService.createdBuckets.subscribe(buckets => {
      this.createdBuckets = buckets;
      console.log(this.createdBuckets)
    })

    this.adminService.selectedLocation.subscribe(location => {
      if (this.locations == null) return;
      if(location == null) {
        range(0, this.locations.length).subscribe(index => {
            this.locations[index].expanded = false;
        })
        return
      }
      range(0, this.locations.length).subscribe(index => {
        if(this.locations[index].locationInfo.uuid === location.uuid){
          this.locations[index].expanded = true;
        } else {
          this.locations[index].expanded = false;
        }
      })
    })

    this.adminService.routePoints.subscribe(points => {
      this.createdRoutePoints = points;
    })

    this.adminService.currentPoint.subscribe(point => {
      this.currentPoint = point;
    })
  }

  panelOpened(location: ExLocation){
    this.editedLocation = location
    this.adminService.setSelectedLocation(location.locationInfo)
  }

  panelClosed(location: ExLocation){
      this.adminService.setSelectedLocation(null)
      this.editingBuckets = false;
      this.adminService.setDrawMode('none')
      this.adminService.setCurrentBucket(null)
      this.adminService.setBuckets(new Array<Bucket>());
  }
  onEditBucketsClick() {
      this.editingBuckets = true
      this.adminService.setDrawMode('bucket')
      this.adminService.setBuckets(this.editedLocation.buckets)
  }

  onEditBucketClick(bucket: Bucket) {
      this.adminService.setCurrentBucket(bucket)
      this.createdRoutePoints = this.editedLocation.locationInfo.routePoints
  }

  onInput(event) {
    const id = (event.target as Element).id
    switch (id) {
      case 'input_bucket_id': this.currentBucket.id = event.target.value; break;
      case 'input_bucket_maxFrogs': this.currentBucket.maxFrogs = event.target.value; break;
      case 'input_bucket_latitude': this.currentBucket.position.latitude = event.target.value; break;
      case 'input_bucket_longitude': this.currentBucket.position.longitude = event.target.value; break;
    }

      this.adminService.setCurrentBucket(this.currentBucket)
  }

  saveBuckets(){
      this.adminService.setCurrentBucket(null)
      this.adminService.setBuckets(new Array<Bucket>());
      this.editingBuckets = false;
      this.adminService.setDrawMode('none')
  }

  onNewBucket() {
    let maxIndex = 0;
    for (const b of this.editedLocation.buckets) {
      const index = Number.parseInt(b.id.split('+')[2], 10);
      if (index > maxIndex) {
        maxIndex = index;
      }
    }
    const id = this.editedLocation.locationInfo.stationId + '+' + this.editedLocation.locationInfo.uuid + '+' + (maxIndex + 1);
    const bucket = new Bucket(id, this.editedLocation.locationInfo.routePoints[0], this.editedLocation.locationInfo.street, this.editedLocation.locationInfo.uuid)

    this.adminService.addBucket(bucket)
    this.adminService.setCurrentBucket(bucket)

  }

  onDeleteBucket() {
    this.adminService.removeBucket(this.currentBucket)
  }

  onEditRoutePoints() {
    this.editingRoutePoints = true
    this.createdRoutePoints = this.editedLocation.locationInfo.routePoints
    this.adminService.setRoutePoints(this.createdRoutePoints)
    this.adminService.setDrawMode('location')
  }

  reorderedPoints(event: CdkDragDrop<Position[]>) {
      moveItemInArray(this.createdRoutePoints, event.previousIndex, event.currentIndex);
      this.adminService.setRoutePoints(this.createdRoutePoints)
    }

    onPositionClick(position: Position){
        this.adminService.setCurrentPoint(position)
        console.log('clicked')
    }

    onDeletePoint(){
        console.log(this.currentPoint)
        this.adminService.removePoint(this.currentPoint)
    }

  savePoints() {
      this.adminService.setRoutePoints(null)
      this.adminService.setDrawMode('none')
      this.editingRoutePoints = false;
  }

  onInputPoint(event){
    const id = (event.target as Element).id
    switch (id) {
      case 'input_point_latitude': this.currentPoint.latitude = event.target.value; break;
      case 'input_point_longitude': this.currentPoint.longitude = event.target.value; break;
      }
      this.adminService.setCurrentPoint(this.currentPoint)
  }

  onAddPoint(){
      let point: Position;
      if(this.createdRoutePoints) {
        let lat = Number.parseFloat(this.createdRoutePoints[this.createdRoutePoints.length-1].latitude)
        let long = Number.parseFloat(this.createdRoutePoints[this.createdRoutePoints.length-1].longitude)
        lat = lat + 0.001
        long = long + 0.001
        point = new Position('' + lat,'' + long)
      } else {
        point = new Position('0', '0')
      }

      this.createdRoutePoints.push(point)
      this.adminService.setRoutePoints(this.createdRoutePoints)
  }

}
