'use strict';
module.exports.miMetodoClase = async event => {
    let nombre = event.queryStringParameters != null ?
        event.queryStringParameters.nombre : null
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: `Hola ${nombre}`
            },
            null,
            2
        ),
    };
};