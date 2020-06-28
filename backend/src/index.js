const express = require("express")
const routes = require('./routes');
const app = express();
const swaggerMiddleware = require('./middleware/addswaggermiddleware');
const helmet = require('helmet');
const { errors } = require('celebrate');
const {handleError} = require('./helpers/error');

app.use(express.json());
app.use(helmet());
app.use(routes);
app.use(errors());

app.use((err, req, res, next) => {
    handleError(err, res);
  });


//ADD SWAGGER MIDDLEWARE
app.use(swaggerMiddleware.route,swaggerMiddleware.server,swaggerMiddleware.setup);

app.listen(3333, () => console.log('Serven is Listening...'));
