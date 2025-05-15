import { Router } from "express";

import { DeliveryLogsController } from "@/controllers/delivery-logs-controllers";

import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const logsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()

logsRoutes.post("/", 
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    deliveryLogsController.Create
)

logsRoutes.get("/:delivery_id/show",
    ensureAuthenticated,
    verifyUserAuthorization(["admin", "costumer"]),
    deliveryLogsController.Show
)

export {logsRoutes}