const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('../api/utility/utility')
const {Op} = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

//Get all products (Books)
router.put('/', async (req, res, next) => {
  try {
    let allProducts
    let ratings = [0, 1, 2, 3, 4, 5]
    const sorting = req.body.order.split(' ')
    let offset = (req.body.page - 1) * req.body.perPage

    if (req.body.ratings.length) ratings = req.body.ratings

    if (req.body.selections.length === 0) {
      allProducts = await Product.findAndCountAll({
        where: [{rating: ratings}],
        order: [
          [sorting[0], sorting[1]],
          ['ratingCount', 'DESC'],
        ],
        offset: offset,
        limit: req.body.perPage,
      })
    } else {
      allProducts = await Product.findAndCountAll({
        where: {
          [Op.and]: [{genre: req.body.selections}, {rating: ratings}],
        },
        order: [
          [sorting[0], sorting[1]],
          ['ratingCount', 'DESC'],
        ],
        offset: offset,
        limit: req.body.perPage,
      })
    }
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

//Get product by id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//Add a new product
router.post('/add', isAdmin, async (req, res, next) => {
  try {
    const createProduct = await Product.create(req.body)
    res.json(createProduct)
  } catch (err) {
    next(err)
  }
})

//Update a product
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const [filled, updatedProduct] = await Product.update(req.body, {
      where: {id: req.params.id},
      returning: true,
    })
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

//Delete a product
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const numOfDeleted = await Product.destroy({
      where: {id: req.params.id},
    })
    res.json(numOfDeleted)
  } catch (err) {
    next(err)
  }
})
