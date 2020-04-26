const Sequelize = require('sequelize')
const db = require('../db.js')

const Author = db.define('author', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT
    // defaultValue:
    //   'https://firstsiteguide.com/wp-content/uploads/2017/09/change-default-author-permalink-640x400.png',
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  }
})

module.exports = Author
