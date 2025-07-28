import { Primitive } from "zod";

export class QueryBuilder {
  private fields: Record<string, Primitive>;
  constructor() {
    this.fields = {};
  }

  public withData(key: string, value: Primitive) {
    this.fields[key] = value;
    return this;
  }

  public build(): string {
    return Object.entries(this.fields)
      .map(([key, value]) => `${key}=${value?.toString()}`)
      .join("&");
  }
}
