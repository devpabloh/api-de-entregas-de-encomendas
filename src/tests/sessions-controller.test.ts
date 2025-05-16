import request from "supertest"
import {app} from "@/app"

describe("SessionsController", ()=>{
    let user_id: String

    it("should authenticate a and get access token", async ()=>{
        const userResponse = await request(app).post("/users").send({
            name: "Test user",
            email: "testuser1@gmail.com",
            password: "1234567"
        })

        user_id = userResponse.body.id

        const sessionResponse = await request(app).post("/sessions").send({
            email: "testuser1@gmail.com",
            password: "1234567" 
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})