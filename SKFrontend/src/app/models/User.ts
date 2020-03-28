import {Address} from './Address';
import {Location} from './Location';

export class User {
  id?: string;
  token?: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  operationalReadiness? = new Array<string>();
  address: Address;
  assignedLocations = new Array<{id: number}>();
}
