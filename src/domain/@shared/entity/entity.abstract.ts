import Notification from "../notification/notification";

export default abstract class Entity {
  protected id: string | undefined;
  public notifications: Notification;

  constructor() {
    this.notifications = new Notification();
  }
}
