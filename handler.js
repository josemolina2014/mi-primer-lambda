'use strict';
const data = require('./controllers/data')
const constantes = require('./resources/constantes')
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
}
const sendResponse = (statusCode, body) => {
    const response = {
        statusCode: statusCode,
        headers: headers,
        body: body
    }
    return response
}
module.exports.getAll = async (event, context) => {
    try{
        console.log(`init getAll productos ${JSON.stringify(event)}`)
        const datos = await data.getAllProducts()
        return sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify(datos))
    } catch (error){
        console.error(error)
        return sendResponse(constantes.SERVER_ERROR, JSON.stringify(error))
    }
}

module.exports.create = async (event, context, callback) => {
    try {
        await data.insertProduct(JSON.parse(event.body))
        return callback(null, sendResponse(constantes.SUCESSFULL_EXECUTION, JSON.stringify({
            message: 'success'
        })))
    } catch (error) {
        console.error(error)
        if (error instanceof TypeError){
            return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
                message: error.message
            })))
        } else {
            return callback(null, sendResponse(constantes.SERVER_ERROR, JSON.stringify({
                message: error
            })))
        }
    }
}