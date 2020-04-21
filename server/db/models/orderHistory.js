const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('orderHistory', {
  status: {
    type: Sequelize.ENUM('Created', 'Shipping', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  shippingAddress: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  nameOnCard: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  billingAddress: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  cardNumber: {
    type: Sequelize.INTEGER
    // allowNull: false,
    // validate: {
    //   isCreditCard: true,
    // },
  },
  cvcNumber: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    validate: {
      len: [1, 3]
    }
  },
  cardExpDate: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      isDate: true
    }
  }
})

module.exports = OrderHistory
