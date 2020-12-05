'use strict'
const DynamoHelper = require('../resources/dynamo_helper')
const constantes = require('../resources/constantes')
const dynamo = new DynamoHelper()
async function getAllProducts () {
  console.log(`${process.env.LOG_ENVIRONMENT} -> start getAllProducts...`)
  const params = {
    TableName: process.env.TABLE_PRODUCTS
  }
  const data = await dynamo.loadData(params)
  console.log(`${process.env.LOG_ENVIRONMENT} -> end getAllProducts successfull with ${JSON.stringify(data)}`)
  return data.Items
}

async function insertProduct (data) {
  console.log(`${process.env.LOG_ENVIRONMENT} -> start insertProduct...`)
  const params = {
    TableName: process.env.TABLE_PRODUCTS,
    Item: {
      marca: data.marca,
      referencia: data.referencia,
    }
  }
  await dynamo.saveData(params)
}

module.exports = {
  getAllProducts, insertProduct
}