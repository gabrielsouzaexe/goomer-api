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
    private weekday: number,
    private startHour: Date,
    private endHour: Date
  ) {
    this.validate();
  }

  validate() {
    if (!mapWeekDay[this.weekday]) {
      throw new Error("Invalid weekday");
    }

    if (this.startHour === undefined) {
      throw new Error("Start hour is required");
    }

    if (this.endHour === undefined) {
      throw new Error("End hour is required");
    }

    if (this.startHour < this.endHour) {
      // TODO
    }
  }
}
