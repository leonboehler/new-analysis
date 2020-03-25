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

  currentBucketData = new Bucket()
  currentBucket = new BehaviorSubject<Bucket>(this.currentBucketData)
  constructor() { }

  setBucketPosition(position: Position) {
   this.currentBucketData.position = position;
   this.currentBucket.next(this.currentBucketData);
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
}
