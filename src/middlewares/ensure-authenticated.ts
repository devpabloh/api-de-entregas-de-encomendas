import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"

import { AppError} from "@/utils/AppError"
import { authConfig } from "@/configs/auth"

interface tokenPayload {
    role: string
    sub: string
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    try {
        const authHeader = request.headers.authorization

        if(!authHeader){
            throw new AppError("JWT token not found", 401)
        }

        // lembrando que o token vem nesse formato: Bearer 4515151546516, estamos utilizando o .split(" ") para separar o Bearer do token através do espaço em branco, e estamos utilizando a desestruturação para pegar apenas o token, pois o Bearer não é necessário
        const [, token ] = authHeader.split(" ")

        // sub é o id do usuário, role é o tipo de usuário, utilizamos o as tokenPayload para dizer que o token é do tipo tokenPayload, pois o verify retorna um object com o id do usuário e o tipo de usuário. Utilizamos o verify para verificar se o token é válido, se for válido, retorna o id do usuário e o tipo de usuário, se não for válido, retorna um erro.
        const {role, sub: user_id} = verify(token, authConfig.Jwt.Secret) as tokenPayload

        // criando uma propriedade user no request, para que possamos utilizar o user em outras rotas 
        request.user = {
            id: user_id,
            role,
        }

        return next()
    } catch (error) {
        throw new AppError("Invalid JWT token", 401)
    }
}

export {ensureAuthenticated}
