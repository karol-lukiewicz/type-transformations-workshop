import { Equal, Expect } from "../helpers/type-utils";

type DeepPartial<T> = T extends Array<infer ArrayItem>
  ? Array<DeepPartial<ArrayItem>>
  : {
    [Key in keyof T]?: DeepPartial<T[Key]>
  };

type MyType = {
  a: string;
  b: number;
  c: {
    d: string;
    e: {
      f: string;
      g: {
        h: string;
        i: string;
      }[];
    };
  };
};

type Result = DeepPartial<MyType>;

type tmp  = DeepPartial<string>;
type tests = [
  Expect<
    Equal<
      Result,
      {
        a?: string;
        b?: number;
        c?: {
          d?: string;
          e?: {
            f?: string;
            g?: {
              h?: string;
              i?: string;
            }[];
          };
        };
      }
    >
  >,
  Expect<
    Equal<
      DeepPartial<{ a: Array<{ b: string }> }>,
      { a?: Array<{ b?: string }> }
    >
  >,
  Expect<Equal<DeepPartial<string>, string>>
];
