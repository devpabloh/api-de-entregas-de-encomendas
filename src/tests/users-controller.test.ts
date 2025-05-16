import request from "supertest"
import { app } from "@/app"
import {prisma} from "@/database/prisma"

describe('UsersController', () => {
    let userId: string

    afterAll( async ()=>{
        await prisma.user.delete({where: {id: userId}})
    })

    it("should create a new user sucessfully", async () => {
        const response = await request(app).post("/users").send({
            name: "Test user",
            email: "testeuser@example.com",
            password: "123456"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Test user")

        userId = response.body.id
    })

    it("should throw an error if user with same email already exists", async ()=>{
        const response = await request(app).post("/users").send({
            name: "duplicate user",
            email: "testeuser@example.com",
            password: "123456"
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("User with same email already exists")
    })

    it("should throw a validation error if email is invalid", async ()=>{
        const response = await request(app).post("/users").send(
            {
                name: "Test user",
                email: "invalidemail",
                password: "123456"
            }
        )

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("validation error")
    })
})