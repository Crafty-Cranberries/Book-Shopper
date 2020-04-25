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

router.get('/:orderId/:bookId', async (req, res, next) => {
  try {
    const singleBookOrder = await BookOrder.findOne({
      where: {orderId: req.params.orderId, bookId: req.params.bookId}
    })
    res.json(singleBookOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId/:bookId', async (req, res, next) => {
  try {
    const newOrUpdateBookOrder = await BookOrder.findOrCreate({
      where: {orderId: req.params.orderId, bookId: req.params.bookId}
    })
    if (!newOrUpdateBookOrder[1]) {
      let updated = await BookOrder.increment('quantity', {
        where: {orderId: req.params.orderId, bookId: req.params.bookId}
      })
      res.status(200)
      res.json(updated)
    } else {
      res.status(201)
      res.json(newOrUpdateBookOrder)
    }
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
