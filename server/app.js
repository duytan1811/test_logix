const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');

const swaggerUi = require('swagger-ui-express');
// [SH] Bring in the data model
require('./api/models/db');

const utils = require('./api/libs/utils');
// [SH] Bring in the routes for the API (delete the default routes)
const routesApi = require('./api/routes/index');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload({
  createParentPath: true
}));
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// TODO should uncomment this line when authentication is enabled
// app.use('/api', utils.authorizeHeader, routesApi);
app.use('/api', routesApi);
app.use(utils.errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, utils.swaggerOption));
module.exports = app;
