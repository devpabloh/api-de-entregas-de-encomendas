import {Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {z} from "zod"

class DeliveriesControllers {
    async create(request: Request, response: Response){

        const bodySchema = z.object({
            user_id: z.string().uuid(), // user_id é o id do usuário que está fazendo o pedido
            description: z.string(),
        })
        
        const {user_id, description} = bodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description: description
            }
        })
        
        return response.status(201).json()
    }

    async index(request: Request, response: Response){

        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {select: {name: true, email: true}}
            }
        })

        return response.json(deliveries)
    }


}

export {DeliveriesControllers}