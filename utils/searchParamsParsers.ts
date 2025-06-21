import { ESortFilter } from "@/schema/enum/sort-filter";
import {
  createParser,
  parseAsArrayOf,
  parseAsIndex,
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
  parseAsStringEnum,
  createSerializer,
  createSearchParamsCache,
  parseAsBoolean,
} from "nuqs/server";
import { toYYYYMMDD } from "./Misc";

export const parseAsDateString = createParser({
  parse(queryValue) {
    const invalid = Number.isNaN(Date.parse(queryValue));

    if (invalid) return null;

    const date = new Date(queryValue);

    return date;
  },
  serialize(value) {
    return toYYYYMMDD(value);
  },
});

export const searchParamsParsers = {
  employee: parseAsInteger.withDefault(0).withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
  employees: parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({
    shallow: false,
  }),
  fromDate: parseAsDateString.withOptions({
    shallow: false,
  }),
  toDate: parseAsDateString.withOptions({ shallow: false }),
  sort: parseAsStringEnum<ESortFilter>(Object.values(ESortFilter))
    .withDefault(ESortFilter.DESC)
    .withOptions({
      shallow: false,
    }),
  page: parseAsIndex.withDefault(1).withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
  limit: parseAsIndex.withDefault(10).withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
  search: parseAsString.withDefault("").withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
  filters: parseAsString.withDefault("").withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
  demoOnly: parseAsInteger.withDefault(-1).withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
  isActive: parseAsBoolean.withDefault(true).withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
  companyStatus: parseAsStringEnum(["1", "0", "all"])
    .withDefault("all")
    .withOptions({
      shallow: false,
      throttleMs: 1000,
    }),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
export const serialize = createSerializer(searchParamsParsers);
