import {Position} from './Position';
import {Bucket} from './Bucket';
import {Location} from './Location';

export class Station {
  chipId: number;
  id?: number;
  battery?: number;
  position: Position;
  buckets?: Array<Bucket>
  locations?: Array<Location>
}
