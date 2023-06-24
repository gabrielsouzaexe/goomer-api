import IRepository from "../../@shared/repository/repository.interface";
import Restaurant from "../entity/restaurant";

export default interface IRestaurantRepository
  extends IRepository<Restaurant> {}
