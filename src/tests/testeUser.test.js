const app = require("../server");
const request = require("supertest");

describe ("Testando User",  () => {
    let tk = "";
    it ("Deve receber status de Created e o usuário corretamente", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            name: "DiegoTASB",
            surname: "Zezedasasasq",
            email: "dieasdassssdsadasda@rocketseat.ufape.net.netsss",
            phone: "(30)998819091",
            gender: "masculino",
            birthDate: "1999-04-28T14:45:15",
            password: "teste"
        })
        
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('user')
    }),
    it ("Teste de autenticacao de user existente", async () => {
        const res = await request(app)

        .post('/auth/authenticate')
        .send({
            email: "dieasdassssdsadasda@rocketseat.ufape.net.netsss",
            password: "teste"
        })
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('token')
        tk = res.body.token;
    }),
    it ("Teste de autenticacao de user inexistente", async () => {
        const res = await request(app)

        .post('/auth/authenticate')
        .send({
            email: "dieasdassssdsadasda@rocketseat.ufape.net.kkk",
            password: "123456r75"
        })
        expect(res.statusCode).toEqual(404)
    }),
    it ("Teste de validacao de token", async () => {
        const res = await request(app)
        
        .get('/projects')
        .set('Authorization', 'Bearer '+tk)
        
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('ok')
    }),
    it ("Teste de autenticacao de user existente com senha errada", async () => {
        const res = await request(app)

        .post('/auth/authenticate')
        .send({
            email: "dieasdassssdsadasda@rocketseat.ufape.net.netsss",
            password: "teste2"
        })
        expect(res.statusCode).toEqual(400)
    }),
    it ("Teste de validacao de token invalido/inexistente", async () => {
        const res = await request(app)
        
        .get('/projects')
        .set('Authorization', tk)
        
        expect(res.statusCode).toEqual(401)
    }),
    it ("Teste de update de user existente", async () => {
        const res = await request(app)

        .put('/auth/update')
        .set('Authorization', 'Bearer '+tk)
        .send({
            email: "dieasdassssdsadasda@rocketseat.ufape.net.netsss",
            name: "Luis",
            surname: "Filipe"
        })
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('token')
        expect(res.statusCode).toEqual(200)
    })
})