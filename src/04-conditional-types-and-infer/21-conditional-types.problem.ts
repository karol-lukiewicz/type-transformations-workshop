import { Equal, Expect } from "../helpers/type-utils";

type YouSayGoodbyeAndISayHello<T extends "hello" | "goodbye"> = T extends "goodbye" ? "hello" : "goodbye";

type tests = [
  Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
  Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
];


// @ts-expect-error
Expect<Equal<YouSayGoodbyeAndISayHello<"dupa">, "dupa">>