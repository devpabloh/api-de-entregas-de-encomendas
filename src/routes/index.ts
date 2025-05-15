import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { routerDeliveries } from "./deliveries-routes";
import { logsRoutes } from "./logs-routes";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", routerDeliveries)
routes.use("/logs", logsRoutes)


export {routes}
