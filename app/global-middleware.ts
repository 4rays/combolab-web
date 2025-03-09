import {registerGlobalMiddleware} from "@tanstack/react-start";
import authMiddleware from "@/lib/server/auth-middleware";

registerGlobalMiddleware({
  middleware: [authMiddleware],
});
