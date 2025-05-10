import { Router } from "express";

import { SessionsControllers } from "@/controllers/sessions-controllers";

const sessionsRoutes = Router()

const sessionsController = new SessionsControllers()

sessionsRoutes.post("/", sessionsController.create)

export {sessionsRoutes}