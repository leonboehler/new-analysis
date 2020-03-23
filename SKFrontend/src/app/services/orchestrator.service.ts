import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {CommunicationService} from './communication.service';
import { Validators } from '@angular/forms';
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
  validEmail(email) {

    var strReg = "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$";

    var regex = new RegExp(strReg);

    return(regex.test(email));

  }

  validString(password){

    return(password)
  }

  getCurrentUser(): User {
      return this.currentUser;
  }
}
