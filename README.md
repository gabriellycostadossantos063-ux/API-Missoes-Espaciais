# API-Missoes-Espaciais

## 1. Identificação
- Aluno:Gabrielly Costa Dos Santos
- Curso:Técnico Em Informática Para Internet
- Unidade Curricular: Desenvolver Serviços Web

## 2. Descrição do Projeto
API REST para gerenciar missões espaciais (CRUD em memória) e consultar a Foto Astronômica do Dia (APOD) da NASA, com tratamento de erros (400, 502, 504), documentação Swagger e testes automatizados.

## 3. Tecnologias Utilizadas
- Node.js
- Express
- Jest
- Supertest
- Swagger (swagger-ui-express e swagger-jsdoc)
- JSON
- Axios (consumo da API APOD da NASA)
- dotenv (variáveis de ambiente)

## 4. Como Clonar o Projeto
```bash
git clone URL_DO_REPOSITORIO
cd NOME_DO_REPOSITORIO
```

## 5. Como Instalar as Dependências
```bash
npm install
```

## 6. Como Executar o Projeto
Copie `.env.example` para `.env` e informe a `NASA_API_KEY` (chave gratuita em https://api.nasa.gov). Sem a chave, a API usa `DEMO_KEY`, com limite de uso reduzido.

```bash
npm start
```
- API: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## 7. Como Executar os Testes
```bash
npm test
```
Os testes cobrem `/status`, o CRUD de `/missoes` (sucesso, 400 e 404) e `/apod` com o axios mockado (sucesso, data inválida, 400, 502 e 504). O relatório de cobertura é gerado automaticamente.

## 8. Documentação dos Endpoints

### GET /status
- Objetivo: verificar se a API está no ar.
- Resposta: `{ "status": "ok" }`
- Status: 200

### GET /missoes
- Objetivo:listar todas as missões.
- Resposta:*`[{ "id": 1, "nome": "Apollo 11", "ano": 1969, "agencia": "NASA", "status": "Concluída" }]`
- Status: 200

### GET /missoes/:id
- Objetivo: buscar uma missão por ID.
- Requisição: `GET /missoes/1`
- Resposta: `{ "id": 1, "nome": "Apollo 11", "ano": 1969, "agencia": "NASA", "status": "Concluída" }`
- Status: 200, 404

### POST /missoes
- Objetivo: cadastrar uma missão.
- Requisição: `{ "nome": "Nova", "ano": 2030, "agencia": "ESA", "status": "Planejada" }`
- Resposta:*`{ "id": 6, "nome": "Nova", "ano": 2030, "agencia": "ESA", "status": "Planejada" }`
- Status: 201, 400

### PUT /missoes/:id
- **Objetivo: atualizar uma missão existente.
- **Requisição: `PUT /missoes/1` com `{ "status": "Revisada" }`
- Resposta: missão atualizada.
- Status: 200, 404

### DELETE /missoes/:id
- Objetivo: remover uma missão.
- Requisição: `DELETE /missoes/1`
- Resposta: sem corpo.
- Status: 204, 404

### GET /apod?date=YYYY-MM-DD
- Objetivo: foto astronômica do dia (NASA). `date` é opcional.
- Requisição: `GET /apod?date=2020-01-01`
- Resposta: `{ "title": "...", "url": "...", "explanation": "..." }`
- Status:200, 400 (data inválida), 502 (falha na NASA), 504 (timeout)

## 9. Evidências
### Testes (npm test com cobertura)


### Swagger UI (/api-docs)
![Swagger] (docs/img/swagger.png)