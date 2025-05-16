"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/delivery-logs-controllers.ts
var delivery_logs_controllers_exports = {};
__export(delivery_logs_controllers_exports, {
  DeliveryLogsController: () => DeliveryLogsController
});
module.exports = __toCommonJS(delivery_logs_controllers_exports);
var import_zod = require("zod");

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
});

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/controllers/delivery-logs-controllers.ts
var DeliveryLogsController = class {
  async Create(request, response) {
    const bodySchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid(),
      description: import_zod.z.string()
    });
    const { delivery_id, description } = bodySchema.parse(request.body);
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id
      }
    });
    if (!delivery) {
      throw new AppError("Delivery not found", 401);
    }
    if (delivery.status === "delivered") {
      throw new AppError("The order has already been delivered");
    }
    if (delivery.status === "processing") {
      throw new AppError("Delivery change status to shipped");
    }
    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    });
    return response.status(201).json();
  }
  async Show(request, response) {
    const paramsSchema = import_zod.z.object({
      delivery_id: import_zod.z.string().uuid()
    });
    const { delivery_id } = paramsSchema.parse(request.params);
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id
      },
      include: {
        user: true,
        // você também pode utilizar incuindo apenas partes específicas ai você utiliza user: { select: { name: true }, {email: true}}
        logs: true
      }
    });
    if (request.user?.role === "costumer" && request.user.id !== delivery?.id) {
      throw new AppError("The user can only view their deliveries", 401);
    }
    return response.json(delivery);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeliveryLogsController
});
