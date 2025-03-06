import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <div>Combolab Landing Page</div>;
}
