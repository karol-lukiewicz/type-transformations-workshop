import { Equal, Expect } from "../helpers/type-utils";

type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";

type DynamicRoutesPattern = `${string}:${string}`;
type DynamicRoutes = Extract<Routes, DynamicRoutesPattern>;

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/posts/:id">>];

// autocomple options
const routeValue: DynamicRoutes = "/users/:id"