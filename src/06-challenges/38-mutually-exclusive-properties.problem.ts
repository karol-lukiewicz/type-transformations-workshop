import { Equal, Expect } from "../helpers/type-utils";

interface Attributes {
  id: string;
  email: string;
  username: string;
}

/**
 * How do we create a type helper that represents a union
 * of all possible combinations of Attributes?
 */
type MutuallyExclusive<T extends Attributes> = {
  [K in keyof Attributes]: { [Key in K]: T[Key] }
}[keyof Attributes];


// type MutuallyExclusive<T extends Attributes> = {
//   [K in keyof Attributes]: Record<K, Attributes[K]>
// }[keyof Attributes];


// approach with conditions and unions, probably could be shortened
// type MutuallyExclusive<T> = keyof T extends infer Key 
//   ? Key extends keyof T
//     // ? Record<Key, T[Key]>
//     ? { [K in Key]: T[K] }
//     : never
//   : never;


type ExclusiveAttributes = MutuallyExclusive<Attributes>;

type tests = [
  Expect<
    Equal<
      ExclusiveAttributes,
      | {
          id: string;
        }
      | {
          email: string;
        }
      | {
          username: string;
        }
    >
  >,
];
