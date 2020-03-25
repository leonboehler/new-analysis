import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Bucket} from '../models/Bucket';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  currentBuckets = new Array<Bucket>()
  createdBuckets = new BehaviorSubject<Bucket[]>(this.currentBuckets)
  constructor() { }

  addButton(bucket: Bucket) {
    this.currentBuckets.push(bucket);
    this.createdBuckets.next(this.currentBuckets);
  }

  bucketChanged(index: number, bucket: Bucket) {
    this.currentBuckets[index] = bucket;
    this.createdBuckets.next(this.currentBuckets);
  }
}
