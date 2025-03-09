import {auth} from "@/lib/server/better-auth";
import {createMiddleware} from "@tanstack/react-start";

// export default defineMiddleware({
//   onRequest: async (event) => {
//     const session = await auth.api.getSession({
//       headers: event.headers,
//     });

//     event.context.auth =
//       session !== null
//         ? {isAuthenticated: true, ...session}
//         : {isAuthenticated: false};
//   },
// });
