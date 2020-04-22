const router = require('express').Router()
const {BookOrder} = require('../db/models')

//Find all orders:
router.get('/', async (req, res, next) => {
  try {
    const bookOrder = await BookOrder.findAll()
    res.json(bookOrder)
  } catch (err) {
    next(err)
  }
})

//Find single order:
router.get('/:id', async (req, res, next) => {
  try {
    const singleBookOrder = await BookOrder.findByPk(req.params.id)
    res.json(singleBookOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
