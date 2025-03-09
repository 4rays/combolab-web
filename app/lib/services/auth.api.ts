import {createServerFn} from "@tanstack/react-start";
import type {Simplify} from "type-fest";
import {getEvent} from "vinxi/http";

import type {Session} from "@/lib/server/better-auth";

export interface Authenticated extends Session {
  isAuthenticated: true;
}

export interface Unauthenticated {
  isAuthenticated: false;
}

export type Auth = Simplify<Authenticated | Unauthenticated>;

const getAuth = createServerFn({method: "GET"}).handler<Auth>(async () => {
  const event = getEvent();
  return event.context.auth;
});

export {getAuth};
