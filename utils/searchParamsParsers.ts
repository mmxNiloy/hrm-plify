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
  }),
  limit: parseAsIndex.withDefault(5).withOptions({
    shallow: false,
  }),
  search: parseAsString.withDefault("").withOptions({
    shallow: false,
  }),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
export const serialize = createSerializer(searchParamsParsers);
