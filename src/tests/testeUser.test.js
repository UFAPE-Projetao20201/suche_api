const app = require("../server");
const request = require("supertest");

describe ("Testando User e suas ações",  () => {
    let tk = "";
    it ("Teste de Criação de usuário", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            name: "Julia",
            surname: "Alboredo",
            email: "juaboredo@ufape.br",
            phone: "11988253004",
            gender: "feminino",
            birthDate: "1995-11-18T14:45:15",
            password: "teste"
        })
        
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('user')
    }),
    it ("Teste de Criação de user com email repetido", async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            name: "Luis",
            surname: "Filipe",
            email: "lf@ufape.br",
            phone: "87981253003",
            gender: "masculino",
            birthDate: "1999-11-18T14:45:15",
            password: "teste"
        })
        
        expect(res.statusCode).toEqual(400)
    }),


    it ("Teste de autenticacao de user existente", async () => {
        const res = await request(app)

        .post('/auth/authenticate')
        .send({
            email: "jualboredo@ufape.br",
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
            email: "luis@rocketseat.ufape.net",
            password: "123456r75"
        })
        expect(res.statusCode).toEqual(404)
    }),
    it ("Teste de validacao de token", async () => {
        const res = await request(app)
        
        .get('/')
        .set('Authorization', 'Bearer '+tk)
        
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('ok')
    }),
    it ("Teste de autenticacao de user existente com senha errada", async () => {
        const res = await request(app)

        .post('/auth/authenticate')
        .send({
            email: "lf@ufape.br",
            password: "teste2"
        })
        expect(res.statusCode).toEqual(400)
    }),
    it ("Teste de validacao de token invalido/inexistente", async () => {
        const res = await request(app)
        
        .get('/')
        .set('Authorization', tk)
        
        expect(res.statusCode).toEqual(401)
    }),
    it ("Teste de update de user existente", async () => {
        const res = await request(app)

        .put('/auth/update')
        .set('Authorization', 'Bearer '+tk)
        .send({
            email: "lf@ufape.br",
            name: "Luis Filipe",
            surname: "Santos Seixas"
        })
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('token')
        expect(res.statusCode).toEqual(200)
    }),

    it ("Teste de criar evento", async () => {
        const res = await request(app)

        .post('/event')
        .set('Authorization', 'Bearer '+tk)
        .send({
        promoter: "60b29fcafb05fa0b566b94c3",
        name: "Forró do Tonho",
        description: "Showzinho de forró pé de serra com José do Acordeon e Armstrong do Pandeiro",
        category: "Música",
        value: 0,
        date: "2022-01-28T14:45:15",
        keywords: ["Forro","Musica"],
        localization: "60b56733f261a10a48adfc80",
        link: "youtube.com/canaldotonho",
        isOnline: true,
        isLocal: true
    })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('event')
    }),
    it ("Promover usuário para promotor de eventos", async() => {
        const res = await request(app)

        .put('/auth/promote')
        .set('Authorization', 'Bearer '+tk)
        .send({
            email: "juaboredo@ufape.br",
            CPF_CNPJ: "08301485087"
        })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
        expect(res.body).toHaveProperty('token')
    }),
    it ("Promover usuário para promotor de eventos com CPF já em uso", async() => {
        const res = await request(app)

        .put('/auth/promote')
        .set('Authorization', 'Bearer '+tk)
        .send({
            email: "lf@ufape.br",
            CPF_CNPJ: "05801485088"
        })

        expect(res.statusCode).toEqual(400)
    }),
    it ("Promover usuário para promotor de eventos com user já como promotor", async() => {
        const res = await request(app)

        .put('/auth/promote')
        .set('Authorization', 'Bearer '+tk)
        .send({
            email: "lf@ufape.br",
            CPF_CNPJ: "05801485080"
        })

        expect(res.statusCode).toEqual(400)
    })
})

describe ("Testando Listagens de eventos",  () => {
    it ("Receber todos Eventos", async() => {
        const res = await request(app)

        .get('/event')
        .send({})

        expect(res.statusCode).toEqual(200)
    })
})