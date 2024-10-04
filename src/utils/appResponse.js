class AppResponse {
  constructor(statusCode, data = null, message = "", status = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export { AppResponse };
