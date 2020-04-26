const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  cart: {
    type: Sequelize.ARRAY(Sequelize.JSONB)
  }
})

module.exports = Order
