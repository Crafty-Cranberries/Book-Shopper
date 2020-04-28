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
    let id = req.params.userId
    const singleOrder = await Order.findOne({
      where: {userId: id, status: 'ongoing'}
    })
    const orderId = singleOrder.dataValues.id

    const newCartItem = await ProductOrder.create({
      quantity: req.body.quantity,
      productId: req.body.productId,
      orderId: orderId,
      price: req.body.price
    })
    res.json(newCartItem)
  } catch (error) {
    next(error)
  }
})
