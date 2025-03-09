import type {Auth} from "@/lib/services/auth.api";
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare module "vinxi/http" {
  interface H3EventContext {
    auth: Auth;
  }
}
