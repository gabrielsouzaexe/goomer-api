import Entity from "../../@shared/entity/entity.abstract";
import Address from "../vo/address";
import OpeningHours from "../vo/openingHours";

export default class Restaurant extends Entity {
  constructor(
    id: string,
    private _name: string,
    public address: Address,
    public openingHours?: OpeningHours
  ) {
    super();
    this._id = id;
    this.validate();
  }

  changeAddress(address: Address) {
    this.address = address;
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
