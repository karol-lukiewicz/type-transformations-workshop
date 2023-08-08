import { Equal, Expect } from "../helpers/type-utils";
import { S } from "ts-toolbelt";

type UserPath = "/users/:id";

type UserOrganisationPath = "/users/:id/organisations/:organisationId";

type ExtractPathParams<Path extends `/${string}`> = {
  [
    PathPart in S.Split<Path, "/">[number]
      as PathPart extends `:${infer Param}` ? Param : never
  ]: string;
};

type tmp = ExtractPathParams<UserPath>;

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >,
];
