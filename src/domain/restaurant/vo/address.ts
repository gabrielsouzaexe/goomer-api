export default class Address {
  constructor(
    private _street: string,
    private _number: number,
    private _zip: string,
    private _city: string
  ) {
    this.validate();
  }

  validate() {
    if (this.street === undefined) {
      throw new Error("Street is required");
    }

    if (this.number === 0) {
      throw new Error("Number is required");
    }

    if (this.zip === undefined) {
      throw new Error("Zip is required");
    }

    if (this.city === undefined) {
      throw new Error("City is required");
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }
}
