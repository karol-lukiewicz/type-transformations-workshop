import { Equal, Expect } from "../helpers/type-utils";

type Fruit =
  | {
      name: "apple";
      color: "red";
    }
  | {
      name: "banana";
      color: "yellow";
    }
  | {
      name: "orange";
      color: "orange";
    };

type TransformedFruit = {
  [SingleFruit in Fruit as SingleFruit["name"]]: `${SingleFruit["name"]}:${SingleFruit["color"]}`
}[Fruit["name"]];

type tests = [
  Expect<
    Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
  >,
];
