import { Request, Response } from "express";
import {z} from "zod"

class UsersControllers{

    create(request: Request, response: Response){
        
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const {email, name, password} = bodySchema.parse(request.body)

        return response.json({message: "User created"})
    }
}

export {UsersControllers}