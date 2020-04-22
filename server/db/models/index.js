const User = require('./user')
const Book = require('./book')
const Order = require('./order')
const Author = require('./author')
const BookOrder = require('./bookOrder')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Order)
Order.belongsTo(User)

// Book.belongsTo(Author)
// Author.hasMany(Book)

Book.belongsToMany(Order, {through: 'BookOrder'})
Order.belongsToMany(Book, {through: 'BookOrder'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Book,
  Order,
  Author,
  BookOrder
}
