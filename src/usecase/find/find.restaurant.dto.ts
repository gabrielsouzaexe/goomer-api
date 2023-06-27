export interface InputFindRestaurantDTO {
  id: string;
}

type OpeningHours = {
  weekday_id: number;
  start_hour: string;
  end_hour: string;
};

export interface OutputFindRestaurantDTO {
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
