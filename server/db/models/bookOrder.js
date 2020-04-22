const Sequelize = require('sequelize')
const db = require('../db')

const BookOrder = db.define('BookOrder', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = BookOrder
