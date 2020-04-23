const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
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
    type: Sequelize.STRING,
    defaultValue:
      'https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg'
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {min: 1, max: 5}
  }
})

module.exports = Book
