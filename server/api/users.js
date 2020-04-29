const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {userId: req.params.userId},
      include: [{model: Product}]
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})

//find a user's active order
router.get('/:userId/orders/active', async (req, res, next) => {
  try {
    let id = req.params.userId
    const singleOrder = await Order.findOne({
      where: {userId: id, status: 'ongoing'},
      include: [{model: Product}]
    })
    res.json(singleOrder)
  } catch (error) {
    next(error)
  }
})

// add a product into an ongoing active user order
router.post('/:userId/orders/active', async (req, res, next) => {
  try {
    //search for that user's order first
    let id = req.params.userId
    const singleOrder = await Order.findOne({
      where: {userId: id, status: 'ongoing'}
    })
    const orderId = singleOrder.dataValues.id

    //search for an existing book on the cart, if it's not there, create it
    //with these default values
    const productOnCart = await ProductOrder.findOrCreate({
      where: {orderId: orderId, productId: req.body.productId},
      defaults: {
        quantity: req.body.quantity,
        price: req.body.price
      }
    })

    //if it was newly created, send it, else increment the quantity
    if (productOnCart[1]) {
      res.json(productOnCart[0])
    } else {
      const updated = await productOnCart[0].increment('quantity', {
        by: req.body.quantity
      })
      res.json(updated)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const [AffectedRow, updatedUser] = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.isAdmin
      },
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})
