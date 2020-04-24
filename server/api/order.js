const router = require('express').Router()
const {Order, User, BookOrder} = require('../db/models')

//Find all orders:
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({include: [{model: BookOrder}]})
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

//Find active single order:
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {userId: req.params.id, status: false},
      include: [{model: BookOrder}]
    })
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})
router.get('/:id/all', async (req, res, next) => {
  try {
    const allUserOrders = await Order.findAll({
      where: {userId: req.params.id}
    })
    res.json(allUserOrders)
  } catch (err) {
    next(err)
  }
})

//Create a new order:
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      userId: req.body.session
    })
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

//Update an order:
router.put('/:id', async (req, res, next) => {
  try {
    const [AffectedRow, updatedOrder] = await Order.update(
      {
        status: req.body.status
      },
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

//Delete an order:
router.delete('/:id', async (req, res, next) => {
  try {
    const orderDeleted = await Order.destroy({
      where: {id: req.params.id}
    })
    res.json(orderDeleted)
  } catch (error) {
    next(error)
  }
})

module.exports = router
