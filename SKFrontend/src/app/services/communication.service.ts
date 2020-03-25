import { Injectable } from '@angular/core';
import {Bucket} from '../models/Bucket';
import {observable, Observable} from 'rxjs';
import { interval } from 'rxjs';
import {AdminInfo} from '../models/adminInfo';
import {User} from '../models/User';
import {Location} from '../models/Location';
import {Station} from '../models/Station';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  baseUrl = 'https://froggyrestserver20200324160726.azurewebsites.net/'
  mockUp = true
  token: string

  constructor(private http: HttpClient) { }

  buckets(): Observable<Bucket[]> {
    if (this.mockUp) {
      return new Observable<Bucket[]>((observer) => {

        interval(1000).subscribe(() => {
          bucketList[0].currentFrogs = bucketList[0].currentFrogs + 1;

          if (bucketList[0].currentFrogs === 6) {
            bucketList[0].currentFrogs = 0;
          }
          observer.next(bucketList);
        });
      });
    }

    //TODO: Server Request
  }

  locations(): Observable<Location[]> {
    if (this.mockUp) {
      return new Observable<Location[]>((observer) => {
        observer.next(locationList);
      });
    }
  }

  stations(): Observable<Station[]> {
    if (this.mockUp) {
      return new Observable<Station[]>((observer) => {
        observer.next(stationList);
      });
    }

    //TODO: Server Request
  }


  getAdmins(): Observable<AdminInfo[]> {
    if (this.mockUp) {
      return new Observable<AdminInfo[]>((observer) => {
        observer.next(adminInfoList);
      });
    }

    //TODO: Server Request
  }


  login(mail: string, password: string): Observable<boolean> {
    if (this.mockUp) {
      let isUser = false;
      userList.forEach(value => {
        if (value.mail === mail && value.password === password) {
          isUser = true;
        }
      });
      return new Observable<boolean>((observer) => {
        observer.next(isUser);
      });
    }

    //TODO: Server Request
  }

  logout(): Observable<boolean> {
    if (this.mockUp) {
      return new Observable((observer) => {
        observer.next(true);
      });
    }
  }
  register(user: User): Observable<boolean> {
    if (this.mockUp) {
      return new Observable((observer) => {
        observer.next(true);
      });
    }

    //TODO: Server Request
  }

  currentUser(): Observable<User> {
    if (this.mockUp) {
      return new Observable<User>((observer) => {
        observer.next(currentUser);
      });
    }
  }

  //TODO: Server Request
}


const bucketList: Bucket[] = [
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

const locationList: Location[] = [{
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
const stationList = [{
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
const adminInfoList: AdminInfo[] = [
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
const userList = [
  {
    mail: 'ron@dhbw.de',
    password: 'csgo1234'
  },
  {
    mail: 'chris@dhbw.de',
    password: '1234'
  }
]

const currentUser: User = {
  firstName: 'Paul',
  lastName: 'Gross',
  birthdate: 15031996,
  mail: 'paul.riedlingen@gmail.com',
  phoneNumber: '015782442045',
  password: 'password123',
  role: 'user',
  operationalReadiness: ['12:00'],
  address: {
    street: 'TheStreet',
    streetNumber: 12,
    postCode: 88045,
    city: 'TheCity',
    state: 'BW',
    country: 'Deutschelande',
  },
  assignedLocations: ['ErsteLoc'
  ],
};

