import { Injectable } from '@angular/core';
import {Bucket} from '../models/Bucket';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import {AdminInfo} from '../models/adminInfo';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

  buckets(): Observable<Bucket[]> {
    return new Observable<Bucket[]>((observer) => {
      const list: Bucket[] = [
        {
          id: '3in31D',
          latitude: '34.12313',
          longitude: '12.34545',
          street: 'B27',
          maxFrogs: 10,
          currentFrogs: 0,
          reserved: false
        },
        {
          id: 'Zw3it31D',
          latitude: '31.124513',
          longitude: '17.34545',
          street: 'B28',
          maxFrogs: 20,
          currentFrogs: 2,
          reserved: false
        }];

      interval(1000).subscribe(() => {
        list[0].currentFrogs = list[0].currentFrogs + 1;

        if (list[0].currentFrogs === 6) {
          list[0].currentFrogs = 0;
        }
        observer.next(list);
      });
    });
  }

  getAdmins(): Observable<AdminInfo[]> {
    return new Observable<AdminInfo[]>((observer) => {
      const list: AdminInfo[] = [
        {
          firstName: 'Ron',
          lastName: 'Chef',
          mail: 'ron@dhbw.de',
          address: {
            street: 'strasse1',
            street_number: 23,
            post_code: 88045,
            city: 'Friedrichshafen1',
            state: 'BW',
            country: 'Deutschelande'
          }
      },
      {
        firstName: 'Chris',
        lastName: 'Boss',
        mail: 'chris@dhbw.de',
        address: {
          street: 'strasse2',
          street_number: 19,
          post_code: 88046,
          city: 'Friedrichshafen2',
          state: 'BW',
          country: 'Deutschelande'
        }
        }];
      observer.next(list);
    });
  }

  login(mail: string, password: string): Observable<boolean> {
    const list = [
      {
        mail: 'ron@dhbw.de',
        password: 'csgo1234'
      },
      {
        mail: 'chris@dhbw.de',
        password: '1234'
      }
    ]

    let isUser = false;
    list.forEach(value => {
      if (value.mail === mail && value.password === password) {
        isUser = true;
      }
    });
    return new Observable<boolean>((observer) => {
      observer.next(isUser);
    });
  }

  register(user: User): Observable<boolean> {
    return new Observable((observer) => {
      observer.next(true);
    });
  }

  user(): Observable<User> {
    return new Observable<User>((observer) => {
      const user: User = {
        firstName: 'Paul',
        lastName: 'Gross',
        birthdate: 15031996,
        mail: 'paul.riedlingen@gmail.com',
        phoneNumber: '015782442045',
        password: 'password123',
        operationalReadiness: {
          startTime: 900,
          endTime: 1800
        },
        address: {
          street: 'TheStreet',
          streetNumber: 12,
          postCode: 88045,
          city: 'TheCity',
          state: 'BW',
          country: 'Deutschelande',
        },
        assignedLocations: [
          {locationId: 4}
        ],
      };

      observer.next(user);
    });
  }
}
