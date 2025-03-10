import type {ReactNode} from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import type {RouterContext} from "@/router";
import {authQueryOptions} from "@/lib/services/auth.query";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({context}) => {
    const auth = await context.queryClient.ensureQueryData(authQueryOptions());
    return {auth};
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </RootDocument>
  );
}

function RootDocument({children}: Readonly<{children: ReactNode}>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
