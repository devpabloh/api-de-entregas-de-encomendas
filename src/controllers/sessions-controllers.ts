import { AppError } from "@/utils/AppError";
import {Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {z} from "zod"
import { compare } from "bcrypt";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

class SessionsControllers {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const {email, password} = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: {email},
            
        })

        if(!user){
            throw new AppError("Invalid email or password", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("Invalid email or password", 401)
        }

        const {Secret, ExpiresIn} = authConfig.Jwt

        const token = sign({role: user.role ?? "customer"}, Secret, {
            subject: user.id,
            expiresIn: ExpiresIn
        })

        const {password: hashedPassword, ...userWithoutPassword} = user

        return response.json({token, user: userWithoutPassword})
    }
}

export {SessionsControllers}