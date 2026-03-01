class apiResponse{
    constructor(statusCode, details, message = "Success"){
        this.statusCode = statusCode
        this.details = details
        this.message = message
        this.success = statusCode < 400
    }
}
export {apiResponse}