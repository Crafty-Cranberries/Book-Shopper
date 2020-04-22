const Sequelize = require('sequelize')
const db = require('../db.js')

const Order = db.define('order', {
  totalCost: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
    validate: {
      notEmpty: true
    }
  },
  totalItems: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 0 // 0 = guest
  }
})

module.exports = Order
