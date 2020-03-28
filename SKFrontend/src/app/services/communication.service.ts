import { Injectable } from '@angular/core';
import {Bucket} from '../models/Bucket';
import {BehaviorSubject, observable, Observable} from 'rxjs';
import { interval } from 'rxjs';
import {AdminInfo} from '../models/adminInfo';
import {User} from '../models/User';
import {Location} from '../models/Location';
import {Station} from '../models/Station';
import {Position} from '../models/Position';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  exampleStation = {
    chipId: 113314159,
    position: {
      latitude: 47.395673,
      longitude: 9.264929
    },
  };
  exampleLocation = {
    chipId: 3114159,
    stationId: null,
    name: 'ZweiteLoc',
    description: 'Beschreibung',
    city: 'FN',
    postalCode: 88045,
    street: 'Glärnischstraße',
    state: 'BW',
    routeLength: '1000',
    locationMarkers: [
      {
        latitude: 47.393209,
        longitude: 9.27823
      },
      {
        latitude: 47.394144,
        longitude: 9.265832
      },
      {
        latitude: 47.395078,
        longitude: 9.264842
      }
    ],
    buckets: bucketList.slice(3, 6)
  };
  exampleBucket = {
    chipId: 7314159,
    name: 'ZweiteStation+ZweiteLoc+6',
    locationId: null,
    position: {
      latitude: 47.395078,
      longitude: 9.264842
    },
    frogAmountMax: 20,
  };
  exampleUser = {
    id: '12',
    token: 'token',
    firstName: 'Ron',
    lastName: 'Chef',
    email: 'felix@dhbw.de',
    birthdate: '1960-07-01',
    phoneNumber: '0156824435',
    password: 'csgo1234',
    role: 'user',
    assignedLocations: [{id: 1}],
    operationalReadiness: ['12:00:00'],
    address: {
      street: 'strasse1',
      streetNumber: '23',
      postCode: '88045',
      city: 'Friedrichshafen1',
      state: 'BW',
      country: 'Deutschelande'
    }
  }

  baseUrl = 'https://froggyrestserver20200324160726.azurewebsites.net/';
  mockUp = false;
  token: string;
  logPosts = true;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  allstations = new BehaviorSubject<Station[]>([]);
  alllocations = new BehaviorSubject<Location[]>([]);
  allbuckets = new BehaviorSubject<Bucket[]>([]);
  allusers = new BehaviorSubject<User[]>([]);
  alladmins = new BehaviorSubject<AdminInfo[]>([]);

  constructor(private http: HttpClient) {
    this.fetchAll();
    this.createUser(this.exampleUser).subscribe()
    /*
    this.bucket.locationId = 1;
    this.createBucket(this.bucket).subscribe(resultBucket => {console.log(resultBucket);
    /*this.createStation(this.station).subscribe(resultStation => {
    console.log(resultStation);
    this.location.stationId = resultStation.id;
    this.createLocation(this.location).subscribe(resultLocation => {

    });
  });*/
  }

  async fetchAll() {
    await this.fetchStations();
    await this.fetchLocations();
    await this.fetchBuckets();
  }

  async fetchBuckets() {
    return new Promise<void>((resolve, reject) => {
      if (this.mockUp) {
        this.allbuckets.next(bucketList);
        resolve();
      }
      this.http.get(this.baseUrl + 'map/allbuckets').subscribe(returns => {
        const fetchedBuckets = new Array<Bucket>();

        (returns as any).data.forEach(receivedBucket => {

          const position = {
            longitude: receivedBucket.bucket_longitude,
              latitude: receivedBucket.bucket_latitude
          };
          const bucket = new Bucket(receivedBucket.bucket_id, position, '');
          bucket.locationId =  receivedBucket.location_id;
          bucket.chipId = receivedBucket.bucket_chip_id;
          bucket.name = receivedBucket.bucket_name, bucket.battery = receivedBucket.bucket_battery_level, bucket.frogAmountMax = receivedBucket.bucket_max_toads;
          bucket.frogAmount = receivedBucket.bucket_toads_count;
          bucket.reserved = false;
          fetchedBuckets.push(bucket);
          });
        console.log('Erhaltene Buckets');
        console.log(fetchedBuckets);
        this.allbuckets.next(fetchedBuckets);
        resolve();
      });
    });
  }

  async fetchLocations() {
    return new Promise<void>((resolve, reject) => {
      if (this.mockUp) {
        this.alllocations.next(locationList);
        resolve();

      }
      this.http.get(this.baseUrl + 'map/alllocations').subscribe(returns => {

        const fetchedLocations = [];
        (returns as any).data.forEach(receivedLocation => {

          const routePoints = [];

          receivedLocation.LocationMarkers.forEach(marker => {
            routePoints.push({
              longitude: marker.longitude,
              latitude: marker.latitude
            });
          });

          const location = new Location();
          location.id = receivedLocation.location_id;
          location.stationId = receivedLocation.location_station_id;
          location.city = receivedLocation.location_city;
          location.state = receivedLocation.location_country;
          location.routeLength = receivedLocation.LocationMarkers.length;
          location.locationMarkers = routePoints;
          location.bucketAmount = receivedLocation.location_bucket_count;
          location.buckets = []

          fetchedLocations.push(location)
          });

        console.log('Erhaltene Locations');
        console.log(fetchedLocations);
        this.alllocations.next(fetchedLocations);
        resolve();
      });
    })
  }

async fetchStations() {
    return new Promise<void>((resolve, reject) => {
      if (this.mockUp) {
        this.alllocations.next(locationList);
        resolve();

      }

      this.http.get(this.baseUrl + 'map/allstations').subscribe(returns => {

        const fetchedStations = [];

        (returns as any).data.forEach(station => {

          fetchedStations.push({
            id: station.station_id,
            chipId: station.station_chip_id,
            position: {
              longitude: station.station_longitude,
              latitude: station.station_latitude
            },
            bucketAmount: -1
          });

        });
        console.log('Erhaltene Stations');
        console.log(fetchedStations);
        this.allstations.next(fetchedStations);
        resolve();
      });
    });
  }

async fetchUsers() {
    if (this.mockUp) {
      this.allusers.next(userList);
      return;
    }
    this.http.get(this.baseUrl + 'admin/user/all').subscribe(returns => {
      // TODO: serverside not implemented
    });
  }

fetchAdmins() {
    if (this.mockUp) {
      this.alladmins.next(adminInfoList);
    }

    // TODO: serverside not implemented
  }

createStation(station: Station): Observable <{success: boolean; id: number}> {
    return new Observable<{success: boolean; id: number}>(observer => {

      if (this.logPosts) {
        console.log('CreateStation sending: ');
        console.log(JSON.stringify(station));
      }


      this.http.post(this.baseUrl + 'admin/stationcreate', JSON.stringify(station), this.httpOptions).subscribe(response => {
        if (this.logPosts) {
          console.log('CreateStation response: ');
          console.log(response);
        }
        if ((response as any).message === 'success') {
          observer.next({success: true, id: (response as any).data.Id});
        } else {
          observer.next({success: false, id: null});
        }
      });
    });
  }

createBucket(bucket: Bucket): Observable <{success: boolean; id: number}> {

    return new Observable<{success: boolean; id: number}>((observer) => {
      if (this.logPosts) {
        console.log('CreateBucket sending: ');
        console.log(JSON.stringify(bucket));
      }
      this.http.post(this.baseUrl + 'admin/bucketcreate', JSON.stringify(bucket), this.httpOptions).subscribe(response => {
        if (this.logPosts) {
          console.log('CreateBucket response: ');
          console.log(response);
        }
        if ((response as any).message === 'success') {
          observer.next({success: true, id: (response as any).data.Id});
        } else {
          observer.next({success: false, id: null});
        }
      });
    });
  }

createLocation(location: Location): Observable <{success: boolean; id: number}> {
    return new Observable<{success: boolean; id: number}>((observer) => {

      const body = {
        name: location.name,
        chipId: location.chipId,
        description: location.description,
        street: location.street,
        postalCode: location.postalCode,
        city: location.city,
        state: location.state,
        routeLength: location.routeLength,
        stationId: location.stationId
      };
      if (this.logPosts) {
        console.log('CreateLocation sending: ');
        console.log(JSON.stringify(body));
      }
      this.http.post(this.baseUrl + 'admin/locationcreate', JSON.stringify(body), this.httpOptions).subscribe(response => {
        if (this.logPosts) {
          console.log('CreateLocation response: ');
          console.log(response);
        }
        if ((response as any).message === 'success') {
          this.setRoutePoints((response as any).data.Id, location.locationMarkers).subscribe(result => {
            if (result) {
              observer.next({success: true, id: (response as any).data.Id});
            } else {
              observer.next({success: false, id: null});
            }
          });
        } else {
          observer.next({success: false, id: null});
        }
      });
    });
  }

setRoutePoints(locationId: number, points: Position[]): Observable <boolean> {
    return new Observable<boolean>((observer) => {
      const body = {
        id: locationId,
        locationMarkers: points
      };
      if (this.logPosts) {
        console.log('SetRoutPoints sending: ');
        console.log(JSON.stringify(body));
      }
      this.http.post(this.baseUrl + 'admin/locationinsertmarker', JSON.stringify(body), this.httpOptions).subscribe(response => {
        if (this.logPosts) {
          console.log('SetRoutePoints response: ');
          console.log(response);
        }
        if ((response as any).message === 'success') {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }

createUser(user: User): Observable <boolean> {
    return new Observable<boolean>((observer) => {
      if (this.logPosts) {
        console.log('CreateUser sending: ');
        console.log(JSON.stringify(user));
      }
      this.http.post(this.baseUrl + 'user/create', user, this.httpOptions).subscribe(response => {
       if (this.logPosts) {
         console.log('CreateUser response: ');
         console.log(response);
       }
       if ((response as any).message === 'success') {

        } else {
          observer.next(false);
        }
      });
    });
  }

  updateUserData(user: User): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (this.logPosts) {
        console.log('CreateUser sending: ');
        console.log(JSON.stringify(user));
      }
      this.http.post(this.baseUrl + 'user/create', user, this.httpOptions).subscribe(response => {
        if (this.logPosts) {
          console.log('CreateUser response: ');
          console.log(response);
        }
        if ((response as any).message === 'success') {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }
login(mail: string, password: string): Observable <{success: boolean, token: string}> {
    if(this.mockUp) {
      let isUser = false;
      userList.forEach(value => {
        if (value.mail === mail && value.password === password) {
          isUser = true;
        }
      });
      return new Observable<{success: boolean, token: string}>((observer) => {
        observer.next({success: true, token: 'token1'});
      });
    }

    return new Observable<{success: boolean, token: string}>((observer) => {
      const body = {
        email: mail,
        password: password
      }

      this.http.post(this.baseUrl+'user/login',body,this.httpOptions).subscribe(response => {
        if((response as any).message === 'success'){
          observer.next({success: true, token: (response as any).data.token})
        } else {
          observer.next({success: false, token: null})
        }
      });
    });
  }

logout(): Observable <boolean> {
    if(this.mockUp) {
      return new Observable((observer) => {
        observer.next(true);
      });
    }
  }

currentUser(): Observable <User> {
    if(this.mockUp) {
      return new Observable<User>((observer) => {
        observer.next(currentUser);
      });
    }
return new Observable<User>((observer) => {
      observer.next(currentUser);
    });
  }

}
const bucketList: Bucket[] = [
    {
      id: 0,
      chipId: 0,
      name: 'ErsteStation+ErsteLoc+0',
      locationId: 1,
      position: {
        latitude: 48.262698,
        longitude: 9.33563
      },
      frogAmountMax: 10,
    },
    {
      id: 1,
      chipId: 1,
      name: 'ErsteStation+ErsteLoc+1',
      locationId: 1,
      position: {
        latitude: 48.264994,
        longitude: 9.33563
      },
      frogAmountMax: 10,
    },
    {
      id: 2,
      chipId: 2,
      name: 'ErsteStation+ErsteLoc+2',
      locationId: 1,
      position: {
        latitude: 48.272160,
        longitude: 9.35259
      },
      frogAmountMax: 10,
    },
    {
      id: 3,
      chipId: 3,
      name: 'ErsteStation+ErsteLoc+3',
      locationId: 1,
      position: {
        latitude: 48.274351,
        longitude: 9.34842
      },
      frogAmountMax: 10,
    },
    {
      id: 4,
      chipId: 4,
      name: 'ZweiteStation+ZweiteLoc+4',
      locationId: 2,
      position: {
        latitude: 47.393209,
        longitude: 9.27823
      },
      frogAmountMax: 20,
    },
    {
      id: 5,
      chipId: 5,
      name: 'ZweiteStation+ZweiteLoc+5',
      locationId: 2,
      position: {
        latitude: 47.394144,
        longitude: 9.265832
      },
      frogAmountMax: 20,
    },
    {
      id: 6,
      chipId: 4314159,
      name: 'ZweiteStation+ZweiteLoc+6',
      locationId: 3314159,
      position: {
        latitude: 47.395078,
        longitude: 9.264842
      },
      frogAmountMax: 20,
    }];


const locationList: Location[] = [{

    id: 0,
    chipId: 1,
    stationId: 1,
    name: 'ErsteLoc',
    description: 'Beschreibung',
    city: 'FN',
    postalCode: 88045,
    street: 'B27',
    state: 'BW',
    routeLength: '3000',
    locationMarkers: [
      {
        latitude: 48.262698,
        longitude: 9.33563
      },
      {
        latitude: 48.264994,
        longitude: 9.33563
      },
      {
        latitude: 48.272160,
        longitude: 9.35259
      },
      {
        latitude: 48.274351,
        longitude: 9.34842
      }
    ],
    buckets: bucketList.slice(0, 3)
  },
    {
      id: 1,
      chipId: 3314159,
      stationId: 314159,
      name: 'ZweiteLoc',
      description: 'Beschreibung',
      city: 'FN',
      postalCode: 88045,
      street: 'Glärnischstraße',
      state: 'BW',
      routeLength: '1000',
      locationMarkers: [
        {
          latitude: 47.393209,
          longitude: 9.27823
        },
        {
          latitude: 47.394144,
          longitude: 9.265832
        },
        {
          latitude: 47.395078,
          longitude: 9.264842
        }
      ],
      buckets: bucketList.slice(3, 6)
    }];

const stationList: Station[] = [{
    id: 0,
    chipId: 1,
    position: {
      latitude: 48.27758,
      longitude: 9.32284
    },
    battery: 20,
    locations: locationList.slice(0, 0),
    buckets: locationList[0].buckets
  },
    {
      id: 1,
      chipId: 314159,
      position: {
        latitude: 47.395673,
        longitude: 9.264929
      },
      battery: 80,
      locations: locationList.slice(1, 1),
      buckets: locationList[1].buckets
    }];

const userList: User[] = [
    {
      id: '12',
      token: 'token',
      firstName: 'Ron',
      lastName: 'Chef',
      mail: 'ron@dhbw.de',
      birthdate: '12121960',
      phoneNumber: '0156824435',
      password: 'csgo1234',
      role: 'user',
      operationalReadiness: ['12:00'],
      assignedLocations: [{id: 1}],
      address: {
        street: 'strasse1',
        streetNumber: '23',
        postCode: '88045',
        city: 'Friedrichshafen1',
        state: 'BW',
        country: 'Deutschelande'
      }
    },
    {
      id: '13',
      token: 'token2',
      firstName: 'Chris',
      lastName: 'Boss',
      mail: 'chris@dhbw.de',
      birthdate: 12121960,
      phoneNumber: '0156824435',
      password: 'test123',
      role: 'admin',
      operationalReadiness: ['13:00'],
      assignedLocations: locationList.slice(1, 1),
      address: {
        street: 'strasse2',
        streetNumber: '19',
        postCode: '88046',
        city: 'Friedrichshafen2',
        state: 'BW',
        country: 'Deutschelande'
      }
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

const currentUser: User = userList[0];

