const Sequelize = require('sequelize')
const db = require('../db.js')

const Order = db.define('order', {
  productName: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  totalCost: {
    type: Sequelize.FLOAT,
    // allowNull: false,
    defaultValue: 0.0,
    validate: {
      notEmpty: true
    }
  },
  totalItems: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order
