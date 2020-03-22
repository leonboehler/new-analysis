export class AdminInfo {
    firstName: string;
    lastName: string;
    mail: string;
    address: {
      street: string;
      street_number: number;
      post_code: number;
      city: string;
      state: string;
      country: string;
    };
}
