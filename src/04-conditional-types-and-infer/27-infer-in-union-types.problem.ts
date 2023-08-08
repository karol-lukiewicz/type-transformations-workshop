import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

// type GetParserResult<T> = T extends
//   { parse: (...args: any) => infer Result }
//   | { extract: (...args: any) => infer Result }
//   | ((...args: any) => infer Result)
//   ? Result : never

// idea: wouldn't it be be much simple to have a util class FunctionReturning<infer Result>
type FunctionReturning<Return> = (...args: any[]) => Return
type GetParserResult<T> = T extends
  { parse: FunctionReturning<infer Result> }
  | { extract: FunctionReturning<infer Result> }
  | FunctionReturning<infer Result>
  ? Result : never

type tmp = GetParserResult<typeof parser1>;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>,
];
