import { Request, Response } from "express";
import {z} from "zod";
import {prisma} from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class DeliveryLogsController {

    async Create(request: Request, response: Response){
        // aqui nós estamos validando o body da requisição
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        // aqui nós estamos pegando o body da requisição e validando se está de acordo com o schema que criamos
        const {delivery_id, description} = bodySchema.parse(request.body)

        // aqui nós estamos buscando a delivery no banco de dados
        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            }
        })

        // aqui nós estamos verificando se a delivery existe se não existir nós estamos lançando um erro
        if(!delivery){
            throw new AppError("Delivery not found",401 )
        }

        // aqui nós estamos verificando se a delivery está em status de processing se estiver nós estamos lançando um erro
        if(delivery.status === "delivered"){
            throw new AppError("The order has already been delivered")
        }

        if(delivery.status === "processing"){
            throw new AppError("Delivery change status to shipped")
        }

        // aqui nós estamos criando o log da delivery no banco de dados, e retornando uma resposta vazia
        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        })

        return response.status(201).json()
    }

    async Show(request: Request, response: Response){
        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
        })

        const {delivery_id} = paramsSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id
            }, include: {
                user: true, // você também pode utilizar incuindo apenas partes específicas ai você utiliza user: { select: { name: true }, {email: true}}
                logs: true,
            }
        })

        if(request.user?.role === "costumer" && request.user.id !== delivery?.id){
            throw new AppError("The user can only view their deliveries", 401)
        }

        return response.json(delivery)
    }
}

export {DeliveryLogsController}