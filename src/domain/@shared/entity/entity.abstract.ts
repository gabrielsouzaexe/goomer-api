import Notification from "../notification/notification";

export default abstract class Entity {
  protected _id!: string;
  public notifications: Notification;

  constructor() {
    this.notifications = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
