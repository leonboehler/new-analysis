import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Location } from '../models/Location';
import { Bucket } from '../models/Bucket';
import { Station } from '../models/Station';
import { AdminInfo } from '../models/adminInfo';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceMock {

  allowLogout: boolean = true;
  logouts: number = 0;

  buckets(): Observable<Bucket[]> {
    return new Observable<Bucket[]>((observer) => {
      observer.next(bucketList);
    });
  }

  locations(): Observable<Location[]> {
    return new Observable<Location[]>((observer) => {
      observer.next(locationList);
    });
  }

  stations(): Observable<Station[]> {
    return new Observable<Station[]>((observer) => {
      observer.next(stationList);
    });
  }

  getAdmins(): Observable<AdminInfo[]> {
    return new Observable<AdminInfo[]>((observer) => {
      observer.next(adminInfoList);
    });
  }

  login(mail: string, password: string): Observable<boolean> {
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

  logout(): Observable<boolean> {
    this.logouts += 1;
    return new Observable((observer) => {
      observer.next(this.allowLogout);
    });
  }


  register(user: User): Observable<boolean> {
    return new Observable((observer) => {
      observer.next(true);
    });
  }

  currentUser(): Observable<User> {
    return new Observable<User>((observer) => {
      observer.next(currentUser);
    });
  }

};

const bucketList: Bucket[] = [
  {
    id: 'ErsteStation+ErsteLoc+0',
    locationId: 'ErsteLoc',
    position: {
      latitude: '48.262698',
      longitude: '9.33563'
    },
    street: 'B27',
    maxFrogs: 10,
    currentFrogs: 6,
    reserved: false
  },
  {
    id: 'ErsteStation+ErsteLoc+1',
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
    id: 'ErsteStation+ErsteLoc+2',
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
    id: 'ErsteStation+ErsteLoc+3',
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
    id: 'ZweiteStation+ZweiteLoc+0',
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
    id: 'ZweiteStation+ZweiteLoc+1',
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
    id: 'ZweiteStation+ZweiteLoc+2',
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

