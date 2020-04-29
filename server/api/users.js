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

    //increment the quantity if it already existed
    if (!productOnCart[1]) {
      await productOnCart[0].increment('quantity', {
        by: req.body.quantity
      })
    }
    //we'll send the product information with this
    const productInfo = await Order.findOne({
      where: {id: orderId},
      include: [{model: Product, where: {id: req.body.productId}}]
    })
    res.json(productInfo)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/orders/active', async (req, res, next) => {
  try {
    //search for that user's order first
    let id = req.params.userId
    const singleOrder = await Order.findOne({
      where: {userId: id, status: 'ongoing'}
    })
    const orderId = singleOrder.dataValues.id

    const [numOfAffected, updatedProduct] = await ProductOrder.update(
      {
        quantity: req.body.quantity
      },
      {where: {orderId: orderId, productId: req.body.productId}}
    )
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/orders/active/:productId', async (req, res, next) => {
  try {
    //search for that user's order first
    let id = req.params.userId
    const singleOrder = await Order.findOne({
      where: {userId: id, status: 'ongoing'}
    })
    const orderId = singleOrder.dataValues.id

    //delete according to orderid and productid
    const numOfDeleted = await ProductOrder.destroy({
      where: {orderId: orderId, productId: req.params.productId}
    })
    res.json(`${numOfDeleted} product(s) removed from cart`)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/orders/completed', async (req, res, next) => {
  try {
    //complete their active order
    let id = req.params.userId
    const [numOfAffected, completedOrder] = await Order.update(
      {
        status: 'completed'
      },
      {
        where: {userId: id, status: 'ongoing'}
      }
    )
    const newActiveOrder = await Order.create({
      userId: id
    })

    res.json(newActiveOrder)
  } catch (error) {
    next(error)
  }
})
