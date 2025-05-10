import { Request, Response } from "express";
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

        const hashedPassword = await hash(password, 8) // 8 é o número de vezes que vai ser encriptado

        return response.json({message: hashedPassword})
    }
}

export {UsersControllers}