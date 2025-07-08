import { Primitive } from "zod";

type QueryType = Exclude<Primitive, undefined | null>;
type FieldType = QueryType | QueryType[] | null | undefined;
type QueryTuple = [string, FieldType];

export class QueryBuilder {
  private fields: Array<QueryTuple>;
  constructor() {
    this.fields = new Array();
  }

  // withNumber(key: string, val: number) {
  //     this.fields.push([key, val])
  // }

  // withNumberArray(key: string, val: number[]) {
  //     this.fields.push([key, val])
  // }

  // withString(key: string, val: string) {
  //     this.fields.push([key, val])
  // }

  // withStringArray(key: string, val: string[]) {
  //     this.fields.push([key, val])
  // }

  // withBool(key: string, val: boolean) {
  //     this.fields.push([key, val])
  // }

  // withBoolArray(key: string, val: boolean[]) {
  //     this.fields.push([key, val])
  // }

  // TODO: Complete the class later...
}
