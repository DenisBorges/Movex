const objResponse = require('../helpers/objResponse');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  const resObj = objResponse();

  resObj.status = "error";
  resObj.statusCode = statusCode;
  resObj.message = message;
  resObj.data = {};

  res.json(resObj);
};


module.exports = {
  ErrorHandler,
  handleError
}