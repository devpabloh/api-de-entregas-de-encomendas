import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { routerDeliveries } from "./deliveries-routes";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", routerDeliveries)


export {routes}
