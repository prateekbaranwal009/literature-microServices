const express = require('express');
const routes = require("./routes/user.route");
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User Api ',
    version: '1.0.0',
    description:
      'API endpoints for managing users'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
    const healthCheck = {
        status: 'OK',
        message: `Hello from service`,
      }
      res.status(200).send(healthCheck);
})

app.use("/v1", routes);

module.exports = app;