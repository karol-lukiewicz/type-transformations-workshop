import { Equal, Expect } from "../helpers/type-utils";

const myFunc = () => {
  return "hello";
};

/**
 * How do we extract MyFuncReturn from myFunc?
 */
type MyFuncReturn = ReturnType<typeof myFunc>;


// type DiyReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;
// type MyFuncReturn = DiyReturnType<typeof myFunc>;

type tests = [Expect<Equal<MyFuncReturn, string>>];
