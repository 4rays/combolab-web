import * as fs from "node:fs";
import {createFileRoute, useRouter} from "@tanstack/react-router";
import {createServerFn} from "@tanstack/start";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <div>Combolab Landing Page</div>;
}
