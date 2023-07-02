import Address from "../vo/address";
import OpeningHours from "../vo/openingHours";
import Restaurant from "./restaurant";

describe("Restaurant domain", () => {
  it("should throw a error when name is null", () => {
    expect(() => {
      new Restaurant("id", "");
    }).toThrowError("Restaurant: Name is required");
  });

  it("should throw a error when id is null", () => {
    expect(() => new Restaurant("", "Joaquim")).toThrowError(
      "Restaurant: ID is required"
    );
  });

  it("should throw a error when creating address without street", () => {
    expect(() => new Address("", 333, "00000-000", "São Paulo")).toThrowError(
      "Street is required"
    );
  });

  it("should change the restaurant name", () => {
    const restaurant = new Restaurant("id", "Paris 6");

    restaurant.changeName("Fasano");

    expect(restaurant.name).toBe("Fasano");
  });

  it("should throw a error when using a invalid weekday", () => {
    expect(() => new OpeningHours(8, "12:30", "18:30")).toThrowError(
      "Invalid number of working days"
    );
  });
});
