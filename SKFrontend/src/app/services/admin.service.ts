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
}
