import { Union } from "ts-toolbelt";
import { Equal, Expect } from "../helpers/type-utils";

type Names = [
  "Matt Pocock",
  "Jimi Hendrix",
  "Eric Clapton",
  "John Mayer",
  "BB King",
];

type GetSurname<T> = T extends `${string} ${infer Surname}` ? Surname : never;

type tests = [
  Expect<Equal<GetSurname<Names[0]>, "Pocock">>,
  Expect<Equal<GetSurname<Names[1]>, "Hendrix">>,
  Expect<Equal<GetSurname<Names[2]>, "Clapton">>,
  Expect<Equal<GetSurname<Names[3]>, "Mayer">>,
  Expect<Equal<GetSurname<Names[4]>, "King">>,
];

// more generic type operating on the whole array

// key remapping approach, not sure if is there a way to do it without getting union type as intermediate result
type ListOfNames = Array<`${string} ${string}`>;
type GetSurnamesUnion<T extends ListOfNames> = T extends Array<`${string} ${infer Surname}`> 
  ? {
      [Name in T[number]]: Surname;
    }[T[number]]
  : never
type GetSurnames<T extends ListOfNames> = Union.ListOf<GetSurnamesUnion<T>>;

// change tuple intu union and use distributive conditional type
// type GetSurnamesUnionConditionally<T> = T extends Array<infer Name> 
//   ? Name extends `${string} ${infer Surname}` 
//     ? Surname
//     : never
//   : never;
// // :( for some reason Union.ListOf does not work here
// type GetSurnamesBroken<T> = Union.ListOf<GetSurnamesUnionConditionally<T>>;
// 
// type tmp = GetSurnamesBroken<Names>

// recursive approach
type GetSurnamesRec<T> = T extends [] 
  ? T 
  : T extends [infer E, ...infer Tail] 
    ? E extends `${string} ${infer Surname}` 
      ? [Surname, ...GetSurnamesRec<Tail>] 
      : never
    : never;

type tests2 = [
  Expect<Equal<GetSurname<Names[0]>, "Pocock">>,
  Expect<Equal<GetSurname<Names[1]>, "Hendrix">>,
  Expect<Equal<GetSurname<Names[2]>, "Clapton">>,
  Expect<Equal<GetSurname<Names[3]>, "Mayer">>,
  Expect<Equal<GetSurname<Names[4]>, "King">>,


  Expect<Equal<GetSurnames<Names>, ["Pocock",   "Hendrix",   "Clapton",   "Mayer",   "King"]>>,
  Expect<Equal<GetSurnames<[]>, []>>,
  Expect<Equal<GetSurnames<Names>[0], "Pocock">>,
  Expect<Equal<GetSurnames<Names>[1], "Hendrix">>,
  Expect<Equal<GetSurnames<Names>[2], "Clapton">>,
  Expect<Equal<GetSurnames<Names>[3], "Mayer">>,
  Expect<Equal<GetSurnames<Names>[4], "King">>,

  // Expect<Equal<GetSurnamesBroken<Names>, ["Pocock",   "Hendrix",   "Clapton",   "Mayer",   "King"]>>,
  // Expect<Equal<GetSurnamesBroken<[]>, []>>,
  // Expect<Equal<GetSurnamesBroken<Names>[0], "Pocock">>,
  // Expect<Equal<GetSurnamesBroken<Names>[1], "Hendrix">>,
  // Expect<Equal<GetSurnamesBroken<Names>[2], "Clapton">>,
  // Expect<Equal<GetSurnamesBroken<Names>[3], "Mayer">>,
  // Expect<Equal<GetSurnamesBroken<Names>[4], "King">>,

  Expect<Equal<GetSurnamesRec<Names>, ["Pocock",   "Hendrix",   "Clapton",   "Mayer",   "King"]>>,
  Expect<Equal<GetSurnamesRec<[]>, []>>,
  Expect<Equal<GetSurnamesRec<["onlyName"]>, never>>,
  Expect<Equal<GetSurnamesRec<["onlyName", "Matt Pocock"]>, never>>,
  Expect<Equal<GetSurnamesRec<Names>[0], "Pocock">>,
  Expect<Equal<GetSurnamesRec<Names>[1], "Hendrix">>,
  Expect<Equal<GetSurnamesRec<Names>[2], "Clapton">>,
  Expect<Equal<GetSurnamesRec<Names>[3], "Mayer">>,
  Expect<Equal<GetSurnamesRec<Names>[4], "King">>,
];
