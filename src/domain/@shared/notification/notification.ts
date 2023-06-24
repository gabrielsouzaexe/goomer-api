export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  add(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context: string): string {
    return this.errors
      .filter((error) => error.context === context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }
}
