import { Equal, Expect } from "../helpers/type-utils";

type Fruit = "apple" | "banana" | "orange";

// type FilterOnlyAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;
// type AppleOrBanana = FilterOnlyAppleOrBanana<Fruit>

// stops working when "apple" or "banana" are removed from Fruit
type AppleOrBanana = ("apple" | "banana") extends Fruit ? ("apple" | "banana") : never;

type tests = [Expect<Equal<AppleOrBanana, "apple" | "banana">>];
