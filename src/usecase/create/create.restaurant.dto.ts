type OpeningHours = {
  weekday: number[];
  start_hour: string;
  end_hour: string;
};

export interface InputCreateRestaurantDTO {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
  opening_hours: OpeningHours[];
}

export interface OutputCreateRestaurantsDTO {
  id: string;
}
