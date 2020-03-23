import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {CommunicationService} from './communication.service';
@Injectable({
  providedIn: 'root'
})
export class OrchestratorService {

  selectedBucket: BehaviorSubject<number> = new BehaviorSubject<number>(-1)
  currentUser: User
  constructor(private communicationService: CommunicationService) {
    this.communicationService.user().subscribe(user => {
      this.currentUser = user;
    });
  }

  bucketSelected(id: number) {
    this.selectedBucket.next(id);
  }

  getCurrentUser(): User {
      return this.currentUser;
  }
}
