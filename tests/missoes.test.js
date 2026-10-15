jest.mock('axios');
const axios = require('axios');
const request = require('supertest');
const app = require('../app');
let missoes = require('../src/data/missoes');

describe('Testes da API de Missões Espaciais', () => {
  
  beforeEach(() => {
   
    missoes.length = 0;
    missoes.push(
      { id: 1, nome: "Apollo 11", ano: 1969, agencia: "NASA", status: "Concluída" },
      { id: 2, nome: "Voyager 1", ano: 1977, agencia: "NASA", status: "Em operação" },
      { id: 3, nome: "Artemis II", ano: 2026, agencia: "NASA", status: "Planejada" },
      { id: 4, nome: "James Webb", ano: 2021, agencia: "NASA", status: "Em operação" },
      { id: 5, nome: "Curiosity", ano: 2012, agencia: "NASA", status: "Em operação" }
    );
    jest.clearAllMocks();

  });
   
  test('GET /status deve retornar 200 e ok', async () => {
  const res = await request(app).get('/status');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});

test('GET /missoes retorna array com pelo menos 5 itens', async () => {
  const res = await request(app).get('/missoes');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThanOrEqual(5);
});

test('GET /missoes/:id retorna a missão ou 404', async () => {
  const ok = await request(app).get('/missoes/1');
  expect(ok.status).toBe(200);
  expect(ok.body.id).toBe(1);

  const nao = await request(app).get('/missoes/999');
  expect(nao.status).toBe(404);
});

test('POST /missoes cadastra ou retorna 400', async () => {
  const ruim = await request(app).post('/missoes').send({ nome: 'X' });
  expect(ruim.status).toBe(400);

  const bom = await request(app)
    .post('/missoes')
    .send({ nome: 'Nova', ano: 2030, agencia: 'ESA', status: 'Planejada' });
  expect(bom.status).toBe(201);
  expect(bom.body.nome).toBe('Nova');
});

test('PUT /missoes/:id atualiza ou retorna 404', async () => {
  const ok = await request(app).put('/missoes/1').send({ status: 'Revisada' });
  expect(ok.status).toBe(200);
  expect(ok.body.status).toBe('Revisada');

  const nao = await request(app).put('/missoes/999').send({ nome: 'Y' });
  expect(nao.status).toBe(404);
});

test('DELETE /missoes/:id remove (204) ou retorna 404', async () => {
  const ok = await request(app).delete('/missoes/1');
  expect(ok.status).toBe(204);

  const nao = await request(app).delete('/missoes/999');
  expect(nao.status).toBe(404);
});
});