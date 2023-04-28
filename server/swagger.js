const swaggerAutogen = require('swagger-autogen')()
const doc = {
    info: {
      version: '',      // by default: '1.0.0'
      title: 'STM API',        // by default: 'REST API'
      description: '',  // by default: ''
    },
    host: 'localhost:3030/api',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  };
const outputFile = './public/swagger.json'
const endpointsFiles = ['./api/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);