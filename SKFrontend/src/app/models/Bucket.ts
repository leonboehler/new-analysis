import {Position} from './Position';

export class Bucket {
  id: string;
  locationId: string;
  position: Position;
  street: string;
  maxFrogs: number;
  currentFrogs: number;
  reserved: boolean;
}
