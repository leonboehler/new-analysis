export class User {
   firstName: string;
   lastName: string;
   birthdate: number;
   mail: string;
   phoneNumber: string;
   password: string;
   role: string;
   operationalReadiness: {
     startTime: number
     endTime: number
  };
  address: {
    street: string;
    streetNumber: number;
    postCode: number;
    city: string;
    state: string;
    country: string;
  };
  assignedLocations = new Array<string>();
}
