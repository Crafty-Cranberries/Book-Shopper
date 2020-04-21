const router = require('express').Router()
const {OrderHistory} = require('../db/models')

//Find all orders:
router.get('/', async (req, res, next) => {
  try {
    const orderHistory = await OrderHistory.findAll()
    res.json(orderHistory)
  } catch (err) {
    next(err)
  }
})

//Find single order:
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrderHistory = await OrderHistory.findByPk(req.params.id)
    res.json(singleOrderHistory)
  } catch (err) {
    next(err)
  }
})

module.exports = router
