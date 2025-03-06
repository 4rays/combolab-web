// app/router.tsx
import {createRouter as createTanStackRouter} from "@tanstack/react-router";
import {routerWithQueryClient} from "@tanstack/react-router-with-query";
import {routeTree} from "./routeTree.gen";
import {QueryClient} from "@tanstack/react-query";
import {lazy} from "react";
import {DefaultCatchBoundary} from "@/components/DefaultCatchBoundary";

export interface RouterContext {
  queryClient: QueryClient;
}

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute before refetching
      },
    },
  });

  const router = createTanStackRouter({
    // More info: https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType
    routeTree,
    scrollRestoration: true,
    context: {queryClient},
    // defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    // defaultNotFoundComponent: NotFound,
  });

  if (typeof window !== "undefined") {
    window.getRouter = () => router;
    window.getQueryClient = () => queryClient;
  }

  return routerWithQueryClient(router as any, queryClient);
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

declare global {
  interface Window {
    getRouter: () => ReturnType<typeof createRouter>;
    getQueryClient: () => QueryClient;
  }
}

export const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const QueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-query-devtools").then((mod) => ({
        default: mod.ReactQueryDevtools,
      })),
    );
