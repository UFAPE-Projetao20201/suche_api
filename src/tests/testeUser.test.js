const app = require("../server");
const request = require("supertest");

describe ("Testando User",  () => {
    it ("Deve receber status de Created e o usuário corretamente", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            nome: "DiegoTASB",
            sobrenome: "Zezedasasasq",
            email: "dieasdassssdsadasda@rocketseat.ufape.com.pt",
            telefone: "(21)981sss819091",
            genero: "masculino",
            dataNascimento: "2019-04-28T14:45:15",
            password: "123456r75"
        })
        
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('user')
    })
})