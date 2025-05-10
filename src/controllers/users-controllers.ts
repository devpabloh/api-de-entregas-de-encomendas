import { Request, Response } from "express";
import { prisma} from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import {z} from "zod"

class UsersControllers{

    async create(request: Request, response: Response){
        
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const {email, name, password} = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({where: {email}})

        if(userWithSameEmail){
            throw new AppError( "User with same email already exists")
        }

        const hashedPassword = await hash(password, 8) // 8 é o número de vezes que vai ser encriptado

        const user = await prisma.user.create({
            data: {
                name, 
                email,
                password: hashedPassword
            }
        })

        return response.json(user)
    }
}

export {UsersControllers}