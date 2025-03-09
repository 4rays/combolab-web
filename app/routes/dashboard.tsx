import {createFileRoute, redirect} from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({context}) => {
    // if (!context.auth.isAuthenticated) {
    //   redirect({to: "/auth/sign-up"});
    // }
    redirect({to: "/"});
  },
  component: Dashboard,
});

function Dashboard() {
  return <div>Dashboard</div>;
}
