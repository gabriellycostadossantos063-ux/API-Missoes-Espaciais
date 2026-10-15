const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger');
const missoesRouter = require('./src/router/missoes.router');

const app = express();
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', missoesRouter);

module.exports = app;