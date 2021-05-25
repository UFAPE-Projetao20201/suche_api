const app = require("../server");
const request = require("supertest");

describe ("Testando User",  () => {
    it ("Deve receber status de Created e o usuário corretamente", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            nome: "DiegoTASB",
            sobrenome: "Zezedasasasq",
            email: "dieasdassssdsadasda@rocketseat.ufape.net",
            telefone: "(81)998819091",
            genero: "masculino",
            dataNascimento: "1999-04-28T14:45:15",
            password: "123456r75"
        })
        
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('user')
    })
})