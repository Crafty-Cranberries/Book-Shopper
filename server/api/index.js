const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/book', require('./book'))
router.use('/authors', require('./authors-routes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
