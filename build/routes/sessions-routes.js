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

// src/routes/sessions-routes.ts
var sessions_routes_exports = {};
__export(sessions_routes_exports, {
  sessionsRoutes: () => sessionsRoutes
});
module.exports = __toCommonJS(sessions_routes_exports);
var import_express = require("express");

// src/utils/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "production" ? [] : ["query"]
});

// src/controllers/sessions-controllers.ts
var import_zod2 = require("zod");
var import_bcrypt = require("bcrypt");

// src/env.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  DATABASE_URL: import_zod.z.string().url(),
  JWT_SECRET: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(3333)
});
var env = envSchema.parse(process.env);

// src/configs/auth.ts
var authConfig = {
  Jwt: {
    Secret: env.JWT_SECRET,
    ExpiresIn: "1d"
  }
};

// src/controllers/sessions-controllers.ts
var import_jsonwebtoken = require("jsonwebtoken");
var SessionsControllers = class {
  async create(request, response) {
    const bodySchema = import_zod2.z.object({
      email: import_zod2.z.string().email(),
      password: import_zod2.z.string().min(6)
    });
    const { email, password } = bodySchema.parse(request.body);
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const passwordMatched = await (0, import_bcrypt.compare)(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }
    const { Secret, ExpiresIn } = authConfig.Jwt;
    const token = (0, import_jsonwebtoken.sign)({ role: user.role ?? "customer" }, Secret, {
      subject: user.id,
      expiresIn: ExpiresIn
    });
    const { password: hashedPassword, ...userWithoutPassword } = user;
    return response.json({ token, user: userWithoutPassword });
  }
};

// src/routes/sessions-routes.ts
var sessionsRoutes = (0, import_express.Router)();
var sessionsController = new SessionsControllers();
sessionsRoutes.post("/", sessionsController.create);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sessionsRoutes
});
