export const mapWeekDay: Record<number, string> = {
  1: "Domingo",
  2: "Segunda",
  3: "Terça",
  4: "Quarta",
  5: "Quinta",
  6: "Sexta",
  7: "Sábado",
};

export default class OpeningHours {
  constructor(
    private _weekday: number,
    private _startHour: string,
    private _endHour: string
  ) {
    this.validate();
  }

  validate() {
    if (this.weekday > 7 || this.weekday <= 0) {
      throw new Error("Invalid number of working days");
    }

    if (this.startHour === undefined) {
      throw new Error("Start hour is required");
    }

    if (this.endHour === undefined) {
      throw new Error("End hour is required");
    }

    if (!mapWeekDay[this.weekday]) {
      throw new Error("Invalid weekday");
    }

    if (this.startHour < this.endHour) {
      // TODO: validate if end hour is at least 15 minutes more than start hour
    }
  }

  get weekday(): number {
    return this._weekday;
  }

  get startHour(): string {
    return this._startHour
      .split(":")
      .filter((_, index) => index !== 2)
      .join(":");
  }

  get endHour(): string {
    return this._endHour
      .split(":")
      .filter((_, index) => index !== 2)
      .join(":");
  }
}
