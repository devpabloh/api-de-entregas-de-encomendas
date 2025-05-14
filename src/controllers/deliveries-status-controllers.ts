import {Request, Response} from "express"
import {prisma} from "@/database/prisma"
import {z} from "zod"

class DeliveriesStatusController{
    async updated(request: Request, response: Response){
        const paramsSchema = z.object({
            id: z.string().uuid(),

        })

        const bodySchema = z.object({
            status: z.enum(["processing", "shipped", "delivered", "canceled"]),
        })

        const {id} = paramsSchema.parse(request.params)
        const {status} = bodySchema.parse(request.body)

        await prisma.delivery.update({
            data: {
                status
            },
            where:{
                id
            }
        })

        return response.json()
    }
}

export {DeliveriesStatusController}
