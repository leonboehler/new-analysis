import { Injectable } from '@angular/core';
import {Bucket} from '../models/Bucket';
import {observable, Observable} from 'rxjs';
import { interval } from 'rxjs';
import {AdminInfo} from '../models/adminInfo';
import {User} from '../models/User';
import {Location} from '../models/Location';
import {Station} from '../models/Station';

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
          locationId: 'ErsteLoc',
          position: {
            latitude: '48.262698',
            longitude: '9.33563'
          },
          street: 'B27',
          maxFrogs: 10,
          currentFrogs: 0,
          reserved: false
        },
        {
          id: '3in31D1',
          locationId: 'ErsteLoc',
          position: {
            latitude: '48.264994',
            longitude: '9.33563'
          },
          street: 'B27',
          maxFrogs: 10,
          currentFrogs: 0,
          reserved: false
        },
        {
          id: '3in31D2',
          locationId: 'ErsteLoc',
          position: {
            latitude: '48.272160',
            longitude: '9.35259'
          },
          street: 'B27',
          maxFrogs: 10,
          currentFrogs: 0,
          reserved: false
        },
        {
          id: '3in31D3',
          locationId: 'ErsteLoc',
          position: {
            latitude: '48.274351',
            longitude: '9.34842'
          },
          street: 'B27',
          maxFrogs: 10,
          currentFrogs: 0,
          reserved: false
        },
        {
          id: 'Zw3it31D',
          locationId: 'ZweiteLoc',
          position: {
            latitude: '47.393209',
            longitude: '9.27823'
          },
          street: 'Glärnischstraße',
          maxFrogs: 20,
          currentFrogs: 2,
          reserved: false
        },
        {
          id: 'Zw3it31D1',
          locationId: 'ZweiteLoc',
          position: {
            latitude: '47.394144',
            longitude: '9.265832'
          },
          street: 'Glärnischstraße',
          maxFrogs: 20,
          currentFrogs: 2,
          reserved: false
        },
        {
          id: 'Zw3it31D2',
          locationId: 'ZweiteLoc',
          position: {
            latitude: '47.395078',
            longitude: '9.264842'
          },
          street: 'Glärnischstraße',
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

  locations(): Observable<Location[]> {
    const list: Location[] = [{
      uuid: 'ErsteLoc',
      stationId: 'ErsteStation',
      street: 'B27',
      state: 'BW',
      battery: '60',
      routeLength: '3000',
      routePoints: [
        {
          latitude: '48.262698',
          longitude: '9.33563'
        },
        {
          latitude: '48.264994',
          longitude: '9.33563'
        },
        {
          latitude: '48.272160',
          longitude: '9.35259'
        },
        {
          latitude: '48.274351',
          longitude: '9.34842'
        }
      ],
      bucketAmount: 4
    },
      {
        uuid: 'ZweiteLoc',
        stationId: 'ZweiteStation',
        street: 'Glärnischstraße',
        state: 'BW',
        battery: '20',
        routeLength: '1000',
        routePoints: [
          {
            latitude: '47.393209',
            longitude: '9.27823'
          },
          {
            latitude: '47.394144',
            longitude: '9.265832'
          },
          {
            latitude: '47.395078',
            longitude: '9.264842'
          }
        ],
        bucketAmount: 3
      }];
    return new Observable<Location[]>((observer) => {
      observer.next(list);
    });
  }

  stations(): Observable<Station[]> {
    const list = [{
        uuid: 'ErsteStation',
        position: {
          latitude: '48.27758',
          longitude: '9.32284'
        },
        bucketAmount: 4
      },
      {
        uuid: 'ZweiteStation',
        position: {
          latitude: '47.395673',
          longitude: '9.264929'
        },
        bucketAmount: 3
      }];

    return new Observable<Station[]>((observer) =>{
      observer.next(list);
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
