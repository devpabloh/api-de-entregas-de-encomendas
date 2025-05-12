import { Router } from "express";

import { DeliveriesControllers } from "@/controllers/deliveries-controllers";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routerDeliveries = Router()
const deliveriesControllers = new DeliveriesControllers()

routerDeliveries.use(ensureAuthenticated)

routerDeliveries.post("/", deliveriesControllers.create)

export {routerDeliveries}