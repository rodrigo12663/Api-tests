import  request from 'supertest';
import {app} from "../../app";


describe("Create User Controller",()=>{
    it("Should be able to a create new user",async()=>{
        const response = await request(app)
        .post('/users')
        .send({
            name:'test integration',
            username:'testint',
            email:'integration@gmail.com'
        });
        console.log(response.status);
    });
})