import { Equal, Expect } from "../helpers/type-utils";

const makeQuery = (
  url: string,
  opts?: {
    method?: string;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  },
) => {};

type MakeQueryParameters = Parameters<typeof makeQuery>;
type MakeQueryOpts = Parameters<typeof makeQuery>[1];
type MakeQueryUrl = Parameters<typeof makeQuery>[0];

// my own version without use of Parameters implemented after learning about infer
type DiyParameters<Function extends (...args: any) => any> = Function extends (...args: infer Params) => any ? Params : never;
type MyFuncReturn = DiyParameters<typeof makeQuery>;

type tests = [
  Expect<
    Equal<
      MakeQueryParameters,
      [
        url: string,
        opts?: {
          method?: string;
          headers?: {
            [key: string]: string;
          };
          body?: string;
        },
      ]
    >
  >,
  Expect<
    Equal<
    MakeQueryUrl,
    string
    >
  >,
  Expect<
    Equal<
    MakeQueryOpts,
    {
      method?: string;
      headers?: {
        [key: string]: string;
      };
      body?: string;
    } | undefined
    >
  >,



  Expect<
    Equal<
      DiyParameters<typeof makeQuery>,
      [
        url: string,
        opts?: {
          method?: string;
          headers?: {
            [key: string]: string;
          };
          body?: string;
        },
      ]
    >
  >,
  Expect<
    Equal<
    DiyParameters<typeof makeQuery>[0],
    string
    >
  >,
  Expect<
    Equal<
    DiyParameters<typeof makeQuery>[1],
    {
      method?: string;
      headers?: {
        [key: string]: string;
      };
      body?: string;
    } | undefined
    >
  >,
];
