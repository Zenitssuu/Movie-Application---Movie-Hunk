export default function errorHandler(status, message) {
    let error = new Error();
    error.statusCode = status
    error.message = message

    return error
}