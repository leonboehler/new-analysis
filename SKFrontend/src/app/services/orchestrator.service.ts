import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrchestratorService {

  selectedBucket: BehaviorSubject<number> = new BehaviorSubject<number>(-1)
  constructor() { }

  bucketSelected(id: number) {
    this.selectedBucket.next(id);
  }
}
