import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Bucket} from '../models/Bucket';
import {Position} from '../models/Position';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  createdBucketsData = new Array<Bucket>()
  createdBuckets = new BehaviorSubject<Bucket[]>(this.createdBucketsData)

  currentBucketData: Bucket;
  currentBucket = new BehaviorSubject<Bucket>(null)
  constructor() { }

  setCurrentBucket(bucket: Bucket) {
    this.currentBucketData = bucket;
    this.changeBucket(bucket)
    this.currentBucket.next(this.currentBucketData);
  }

  setBucketPosition(position: Position) {
   this.currentBucketData.position = position;
   this.setCurrentBucket(this.currentBucketData)
  }

  addBucket(bucket: Bucket) {
    this.createdBucketsData.push(bucket)
    this.createdBuckets.next(this.createdBucketsData)
  }

  removeBucket(bucket: Bucket) {
    const index = this.createdBucketsData.indexOf(bucket)
    this.createdBucketsData.splice(index, 1)
    this.createdBuckets.next(this.createdBucketsData)
  }

  setBuckets(buckets: Bucket[]) {
    this.createdBucketsData = buckets;
    this.createdBuckets.next(this.createdBucketsData);
  }

  changeBucket(bucket: Bucket){
    const index = this.createdBucketsData.indexOf(bucket)
    this.createdBucketsData[index] = bucket
    this.createdBuckets.next(this.createdBucketsData)
  }
}
