import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../vo/address";
import OpeningHours from "../vo/openingHours";

export default class Restaurant extends Entity {
  public address!: Address;
  public openingHours!: OpeningHours[];

  constructor(id: string, private _name: string) {
    super();
    this._id = id;
    this.validate();

    if (this.notifications.hasErrors()) {
      throw new NotificationError(this.notifications.getErrors());
    }
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

    if (this.id === "") {
      this.notifications.add({
        context: "Restaurant",
        message: "ID is required",
      });
    }
  }

  get name(): string {
    return this._name;
  }
}
