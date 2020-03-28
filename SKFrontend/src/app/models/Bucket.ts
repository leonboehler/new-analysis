import {Position} from './Position';

export class Bucket {
  chipId: number;
  id?: number;
  locationId: number;
  name: string;
  battery?: number;
  reserved?: boolean;
  position: Position;
  frogAmountMax: number;
  frogAmount?: number;

  constructor(chipId: number, position: Position, street: string) {
    this.chipId = chipId;
    this.position = position;
    this.frogAmountMax = 0;
    this.frogAmount = 0;
    this.reserved = false;
  }

}
