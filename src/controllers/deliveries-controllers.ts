import {Request, Response} from "express"

class DeliveriesControllers {
    create (request: Request, response: Response){
        return response.json({message: "O pedido foi confirmado"})
    }
}

export {DeliveriesControllers}