class ObjectResponse {

    constructor(obj) {
        this.status = obj.status;
        this.statusCode = obj.statusCode;
        this.message = obj.message;
        this.data = obj.data;
    }
}

var obj = {
    status: 'success',
    statusCode: 200,
    message: '',
    data: {}
};

module.exports = () => new ObjectResponse(obj);