export interface InputFindRestaurantDTO {
  id: string;
}

export interface OutputFindRestaurantDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}
