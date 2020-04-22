const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bookId: {
    type: Sequelize.INTEGER
  },
  unitPrice: {
    type: Sequelize.FLOAT
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
  /*
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
  */
})

module.exports = Cart
