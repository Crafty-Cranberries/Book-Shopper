const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/book', require('./book'))
router.use('/authors', require('./author-routes'))
router.use('/order', require('./order'))
router.use('/orderHistory', require('./orderHistory'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
