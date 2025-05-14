import { Router } from "express";

import { DeliveriesControllers } from "@/controllers/deliveries-controllers";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controllers";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const routerDeliveries = Router()
const deliveriesControllers = new DeliveriesControllers()
const deliveriesStatusController = new DeliveriesStatusController()

routerDeliveries.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))

routerDeliveries.post("/", deliveriesControllers.create)
routerDeliveries.get("/", deliveriesControllers.index)

routerDeliveries.patch("/:id/status", deliveriesStatusController.updated)

export {routerDeliveries}