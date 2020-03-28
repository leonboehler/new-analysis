import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Bucket} from '../models/Bucket';
import {Position} from '../models/Position';
import {Location} from '../models/Location';
import {OrchestratorService} from './orchestrator.service';
import {Station} from '../models/Station';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  createdBucketsData = new Array<Bucket>();
  createdBuckets = new BehaviorSubject<Bucket[]>(this.createdBucketsData);

  currentBucketData: Bucket;
  currentBucket = new BehaviorSubject<Bucket>(null);

  selectedLocation = new BehaviorSubject<Location>(null);

  drawMode = new BehaviorSubject<string>('none');

  currentPointData: Position;
  currentPoint = new BehaviorSubject<Position>(null);

  routePointsData = new Array<Position>();
  routePoints = new BehaviorSubject<Position[]>(this.routePointsData);

  selectedStation = new BehaviorSubject<Station>(null)

  constructor(private orchestratorService: OrchestratorService) {}

  setCurrentBucket(bucket: Bucket) {
    this.currentBucketData = bucket;
    this.changeBucket(bucket);
    this.currentBucket.next(this.currentBucketData);
  }

  setBucketPosition(position: Position) {
   this.currentBucketData.position = position;
   this.setCurrentBucket(this.currentBucketData);
  }

  addBucket(bucket: Bucket) {
    this.createdBucketsData.push(bucket);
    this.createdBuckets.next(this.createdBucketsData);
  }

  removeBucket(bucket: Bucket) {
    const index = this.createdBucketsData.indexOf(bucket);
    this.createdBucketsData.splice(index, 1);
    this.createdBuckets.next(this.createdBucketsData);
  }

  setBuckets(buckets: Bucket[]) {
    this.createdBucketsData = buckets;
    this.createdBuckets.next(this.createdBucketsData);
  }

  changeBucket(bucket: Bucket) {
    const index = this.createdBucketsData.indexOf(bucket);
    this.createdBucketsData[index] = bucket;
    this.createdBuckets.next(this.createdBucketsData);
  }

  setDrawMode(mode: string) {
    this.drawMode.next(mode);
  }

  setSelectedLocation(location: Location) {
    this.selectedLocation.next(location);
  }
  setSelectedBucket(bucket: Bucket) {
    if (bucket != null) {
      this.setSelectedLocation(this.orchestratorService.getLocationFromId(bucket.locationId));
    }
  }

  setRoutePoints(points: Array<Position>) {
    this.routePointsData = points;
    this.routePoints.next(this.routePointsData);
  }
  pushRoutePoint(position: Position) {
    this.currentPointData.latitude = position.latitude;
    this.currentPointData.longitude = position.longitude;
    this.setCurrentPoint(this.currentPointData);
  }

  setCurrentPoint(point: Position) {
    this.currentPointData = point;
    this.changePoint(point);
    this.currentPoint.next(this.currentPointData);
  }

  changePoint(point: Position) {
    const index = this.routePointsData.indexOf(point);
    this.routePointsData[index] = point;
    this.routePoints.next(this.routePointsData);
  }

  removePoint(point: Position) {
    const index = this.routePointsData.indexOf(point);
    console.log(this.routePointsData);
    this.routePointsData.splice(index, 1);
    console.log(this.routePointsData);
    this.routePoints.next(this.routePointsData);
  }

  setStationPosition(position: Position){

  }
}
