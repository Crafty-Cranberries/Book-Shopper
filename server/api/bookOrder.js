const router = require('express').Router()
const {BookOrder, Book} = require('../db/models')

//Find all orders:
router.get('/', async (req, res, next) => {
  try {
    const bookOrder = await BookOrder.findAll()
    res.json(bookOrder)
  } catch (err) {
    next(err)
  }
})
//Find all user orders:
router.get('/:id/all', async (req, res, next) => {
  try {
    const userBookOrder = await BookOrder.findAll({
      where: {orderId: req.params.id}
    })
    res.json(userBookOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/:bookId', async (req, res, next) => {
  try {
    const singleBookOrder = await BookOrder.findOne({
      where: {orderId: req.params.id, bookId: req.params.bookId}
    })
    res.json(singleBookOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/:bookId', async (req, res, next) => {
  try {
    const deletedBookOrder = await BookOrder.destroy({
      where: {orderId: req.params.id, bookId: req.params.bookId}
    })
    res.json(deletedBookOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
