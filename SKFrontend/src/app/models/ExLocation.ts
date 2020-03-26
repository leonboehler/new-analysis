import {Location} from './Location';
import {Bucket} from './Bucket';

export class ExLocation {
  locationInfo: Location;
  buckets = new Array<Bucket>();
  expanded = false;
}
