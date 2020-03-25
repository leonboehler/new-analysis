import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {CommunicationService} from './communication.service';
import { Validators } from '@angular/forms';
import {Bucket} from '../models/Bucket';
import {Location} from '../models/Location';
@Injectable({
  providedIn: 'root'
})
export class OrchestratorService {

  selectedBucket: BehaviorSubject<Bucket> = new BehaviorSubject<Bucket>(null)
  selectedLocation: BehaviorSubject<Location> = new BehaviorSubject<Location>(null)

  loadedLocations = new Array<Location>()

  currentUser: User
  constructor(private communicationService: CommunicationService) {
    this.communicationService.currentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.communicationService.locations().subscribe(locations => {
      this.loadedLocations = locations;
    });
  }

  getLocationFromId(id: string): Location {
    for (const location of this.loadedLocations) {
      if (location.uuid === id) {
        return location;
      }
    }
    return null;
  }

  bucketSelected(bucket: Bucket) {
    this.selectedBucket.next(bucket);
  }

  locationSelected(location: Location) {
    this.selectedLocation.next(location);
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
