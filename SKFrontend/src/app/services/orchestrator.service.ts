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
  validName(name){
    var strReg = "^([a-zA-Z-])";

    var regex = new RegExp(strReg);

    return(regex.test(name));
  }
  validBirthday(birthday){
    var year = birthday[0] + birthday[1] + birthday[2] + birthday[3]
    var result = (parseInt(year))
    if(2003>result){
      return true;
    }else{
      return false;
    }
  }
  validEmail(email) {

    var strReg = "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$";

    var regex = new RegExp(strReg);

    return(regex.test(email));

  }

  validPassword(password){
    var returnValue = true;
    var capitalLetter = new Array("A","B","C","D","E","F","G","H","I","J","K","L",
      "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
    var capLetter = false;

    var smalLetter = new Array("a","b","c","d","e","f","g","h","i","j","k","l",
      "m","n","o","p","q","r","s","t","u","v","w","x","y","z");
    var letter = false;

    var numbers = new Array("0","1","2","3","4","5","6","7","8","9");
    var number = false;

    for(var i = 0; i < password.length; i++){
      for (var r = 0; r < capitalLetter.length; r++) {
        if ( password.substr(i,1)  ==  capitalLetter[r]) {
          capLetter = true;
        }
      }
      for (var j = 0; j < smalLetter.length; j++) {
        if ( password.substr(i,1)  ==  smalLetter[j]) {
          letter = true;
        }
      }
      for (var e = 0; e < numbers.length; e++) {
        if ( password.substr(i,1)  ==  number[e]) {
          number = true;
        }
      }
    }
    if(capLetter){
      console.log("capLetter true")
      returnValue = false;
    }
    if(letter){
      console.log("letter true")
      returnValue = false;
    }
    if(number){
      console.log("number true")
      returnValue = false;
    }

    return returnValue;
  }
  validNumber(value) {

    var strReg = "^([0-9])";

    var regex = new RegExp(strReg);

    return(regex.test(value));
  }
  validPostcode(value) {

    var strReg = "^([0-9]){5}";

    var regex = new RegExp(strReg);

    return(regex.test(value));
  }

  getCurrentUser(): User {
      return this.currentUser;
  }
}
