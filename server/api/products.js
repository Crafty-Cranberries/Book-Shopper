const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

function admin(req, res, next) {
  if (!req.user.isAdmin) {
    res.json('You do not have access to this.')
  }
}

//Get all products (Books)
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
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
router.post('/add', admin, async (req, res, next) => {
  try {
    const createProduct = await Product.create(req.body)
    res.json(createProduct)
  } catch (err) {
    next(err)
  }
})

//Update a product
router.put('/:id', admin, async (req, res, next) => {
  try {
    const [filled, updatedProduct] = await Product.update(req.body, {
      where: {id: req.params.id},
      returning: true
    })
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

//Delete a product
router.delete('/:id', admin, async (req, res, next) => {
  try {
    const numOfDeleted = await Product.destroy({
      where: {id: req.params.id}
    })
    res.json(numOfDeleted)
  } catch (err) {
    next(err)
  }
})
