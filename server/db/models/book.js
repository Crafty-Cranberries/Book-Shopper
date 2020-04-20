const Sequelize = require('sequelize')
const db = require('../db')

export const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {min: 1, max: 5}
  }
})
