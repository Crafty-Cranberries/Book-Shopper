const router = require('express').Router()
const {Order} = require('../db/models')

//Find all orders:
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll()
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//Find single order:
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.id)
    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
