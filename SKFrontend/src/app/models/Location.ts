import {Position} from './Position';
import {Bucket} from './Bucket';

export class Location {
  name: string;
  chipId: number;
  id?: number;
  description: string;
  street?: string;
  postalCode?: number;
  city: string;
  state: string;
  routeLength: string;
  locationMarkers?: Array<Position>;
  stationId: number;
  buckets?: Array<Bucket>;
  expanded?: boolean;
  bucketAmount?: number;
}
