'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'michael@email.com', password: '123'}),
    User.create({email: 'franco@email.com', password: '123'}),
    User.create({email: 'gary@email.com', password: '123'}),
    User.create({email: 'jared@email.com', password: '123'})
  ])

  const books = await Promise.all([
    Product.create({
      title: "Harry Potter and The Sorcerer's Stone",
      author: 'J.K Rowling',
      price: 15.99,
      rating: 5,
      genre: 'Fantasy'
    }),
    Product.create({
      title: 'Green Eggs and Ham',
      author: 'Dr. Seuss',
      price: 10.99,
      rating: 5,
      genre: 'Children'
    }),
    Product.create({
      title: 'The Very Hungry Caterpillar',
      author: 'Eric Carle',
      price: 10.99,
      rating: 5,
      genre: 'Children'
    }),
    Product.create({
      title: 'If It Bleeds',
      author: 'Stephen King',
      price: 13.99,
      rating: 4,
      genre: 'Horror'
    }),
    Product.create({
      title: 'The Hobbit',
      author: 'J.R.R Tolkien',
      price: 9.99,
      rating: 5,
      genre: 'Fantasy'
    })
  ])

  const orders = await Promise.all([Order.create({userId: 1})])

  const productsOnCart = await Promise.all([
    ProductOrder.create({orderId: 1, productId: 2, quantity: 5, price: 10}),
    ProductOrder.create({orderId: 1, productId: 3, quantity: 12, price: 5})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
