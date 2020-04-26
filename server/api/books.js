const router = require('express').Router()
const {Book} = require('../db/models')
const {Author} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({include: Author})
    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/genre/:genre', async (req, res, next) => {
  try {
    const booksByGenre = await Book.findAll({
      where: {genre: req.params.genre}
    })
    res.json(booksByGenre)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body)
    res.json(newBook)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [{model: Author}]
    })
    res.json(book)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const [numOfAffected, updatedBook] = await Book.update(
      {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
      },
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    res.json(updatedBook)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const bookDeleted = await Book.destroy({
      where: {id: req.params.id}
    })
    res.json(bookDeleted)
  } catch (error) {
    next(error)
  }
})

module.exports = router