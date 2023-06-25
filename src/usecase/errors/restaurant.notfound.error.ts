export default class RestaurantNotFoundError extends Error {
  constructor() {
    super("Restaurant not found");
  }
}
