import {Position} from './Position';

export class Location {
  uuid: string;
  stationId: string;
  street: string;
  state: string;
  battery: string;
  routeLength: string;
  routePoints: Array<Position>;
  bucketAmount: number;
}
