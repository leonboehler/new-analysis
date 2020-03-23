import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class OrchestratorService {

  selectedBucket: BehaviorSubject<number> = new BehaviorSubject<number>(-1)
  constructor() { }

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
}
