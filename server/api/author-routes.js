const router = require('express').Router()
const {Author} = require('../db/models')

//Find all authors:
router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.findAll()
    res.json(authors)
  } catch (err) {
    next(err)
  }
})

//Find single authors:
router.get('/:authorId', async (req, res, next) => {
  try {
    const singleAuthor = await Author.findByPk(req.params.id)
    res.json(singleAuthor)
  } catch (err) {
    next(err)
  }
})

module.exports = router
