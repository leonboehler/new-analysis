import {Position} from './Position';

export class Bucket {
  id: string;
  locationId: string;
  position: Position;
  street: string;
  maxFrogs: number;
  currentFrogs: number;
  reserved: boolean;

  constructor(id: string, position: Position, street: string, locationId: string) {
    this.id = id;
    this.locationId = locationId;
    this.position = position
    this.street = street;
    this.maxFrogs = 0
    this.currentFrogs = 0
    this.reserved = false;
  }

}
