import { Equal, Expect } from "../helpers/type-utils";

export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

type MyMap = typeof programModeEnumMap;
type IndividualProgram1 = Exclude<MyMap[keyof MyMap], "group" | "announcement">;
export type IndividualProgram = MyMap[Exclude<keyof MyMap, "GROUP" | "ANNOUNCEMENT">];

type DesiredMapKeys = Exclude<keyof typeof programModeEnumMap, "GROUP" | "ANNOUNCEMENT">
type IndividualProgram3 = typeof programModeEnumMap[DesiredMapKeys];

type tests = [
  Expect<
    Equal<
      IndividualProgram,
      "1on1" | "selfDirected" | "planned1on1" | "plannedSelfDirected"
    >
  >,
];
