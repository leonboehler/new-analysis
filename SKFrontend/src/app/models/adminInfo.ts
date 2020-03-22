export class AdminInfo {
    first_name: string;
    last_name: string;
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
