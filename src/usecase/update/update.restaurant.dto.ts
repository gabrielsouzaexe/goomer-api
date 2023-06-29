type OpeningHours = {
  weekday: number[];
  start_hour: string;
  end_hour: string;
};

export interface InputUpdateRestaurantDTO {
  restaurant_uuid: string;
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
  opening_hours: OpeningHours[];
}

export type OutputUpdateRestaurantDTO = void;
