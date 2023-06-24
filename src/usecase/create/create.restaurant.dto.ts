export interface InputCreateRestaurantDTO {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

export interface OutputCreateRestaurantsDTO {
  id: string;
}
