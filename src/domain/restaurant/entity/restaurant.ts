import Entity from "../../@shared/entity/entity.abstract";
import Address from "../vo/address";
import OpeningHours from "../vo/openingHours";

export default class Restaurant extends Entity {
  public openingHours!: OpeningHours[];

  constructor(id: string, private _name: string, public address: Address) {
    super();
    this._id = id;
    this.validate();
  }

  withAddress(address: Address): Restaurant {
    this.address = address;
    return this;
  }

  withOpeningHours(openingHours: OpeningHours[]): Restaurant {
    this.openingHours = openingHours;
    return this;
  }

  changeName(name: string) {
    this._name = name;
  }

  validate() {
    if (this.name.length === 0) {
      this.notifications.add({
        context: "Restaurant",
        message: "Name is required",
      });
    }
  }

  get name(): string {
    return this._name;
  }
}
