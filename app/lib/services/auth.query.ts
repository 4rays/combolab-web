import {queryOptions, useSuspenseQuery} from "@tanstack/react-query";
import type {UseSuspenseQueryResult} from "@tanstack/react-query";

import {getAuth} from "@/lib/services/auth.api";
import type {Authenticated} from "@/lib/services/auth.api";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["getAuth"],
    queryFn: () => getAuth(),
  });

export const useAuthQuery = () => {
  return useSuspenseQuery(authQueryOptions());
};

export const useAuthenticatedQuery = () => {
  const authQuery = useAuthQuery();

  if (authQuery.data.isAuthenticated === false) {
    throw new Error("Not authenticated");
  }

  return authQuery as UseSuspenseQueryResult<Authenticated>;
};
