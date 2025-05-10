import { env } from "@/env"

export const authConfig = {
    Jwt: {
        Secret: env.JWT_SECRET,
        ExpiresIn: "1d"
    }
}