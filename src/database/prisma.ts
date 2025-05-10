import { PrismaClient } from "@prisma/client";

/* 
    aqui estamos importando o prisma client, que é o cliente que vai nos permitir fazer as consultas no banco de dados
    o log é para que ele não mostre as consultas no console quando estiver em produção, pois isso pode ser um problema para o servidor
    o log é um array, pois podemos passar vários logs para ele, como por exemplo, query, info, warn, error, etc
    O que são logs? Logs são mensagens que são geradas pelo sistema para informar sobre o que está acontecendo no sistema
    O que é o log de query? O log de query é o log que mostra as consultas que foram feitas no banco de dados
    por exemplo, se eu fizer uma consulta no banco de dados, o log de query vai mostrar a consulta que foi feita
    e o que foi retornado
*/
export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"]
})