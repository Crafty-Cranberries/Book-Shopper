'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Codingson',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Franco',
      lastName: 'Trelles',
      email: 'franco@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Jared',
      lastName: 'Usher',
      email: 'jared@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Gary',
      lastName: 'Hagen',
      email: 'gary@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Eric',
      lastName: 'Trelles',
      email: 'eric@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Matthew',
      lastName: 'Trelles',
      email: 'matthew@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Andy',
      lastName: 'Chalco',
      email: 'andy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Mariana',
      lastName: 'Llanos',
      email: 'mariana@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Norma',
      lastName: 'Juela',
      email: 'norma@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Carlos',
      lastName: 'Trelles',
      email: 'carlos@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Jacob',
      lastName: 'DeGrom',
      email: 'jacob@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Pete',
      lastName: 'Alonso',
      email: 'pete@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'David',
      lastName: 'Wright',
      email: 'david@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Jose',
      lastName: 'Reyes',
      email: 'jose@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Anthony',
      lastName: 'Enriquez',
      email: 'anthony@email.com',
      password: '123'
    })
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
      rating: 3,
      genre: 'Horror'
    }),
    Product.create({
      title: 'The Hobbit',
      author: 'J.R.R Tolkien',
      price: 9.99,
      rating: 5,
      genre: 'Fantasy'
    }),
    Product.create({
      title: 'Lord of The Rings',
      author: 'J.R.R Tolkien',
      price: 10.99,
      rating: 5,
      genre: 'Fantasy'
    }),
    Product.create({
      title: 'The Little Prince',
      author: 'Antoine de Saint-Exupéry',
      price: 8.99,
      rating: 5,
      genre: 'Fantasy'
    }),
    Product.create({
      title: "Alice's Adventures in Wonderland",
      author: 'Lewis Carroll',
      price: 5.99,
      rating: 4,
      genre: 'Fantasy'
    }),
    Product.create({
      title: 'She: A History of Adventure',
      author: 'H. Rider Haggard',
      price: 14.79,
      rating: 5,
      genre: 'Adventure'
    }),
    Product.create({
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      price: 12.5,
      rating: 5,
      genre: 'Adventure'
    }),
    Product.create({
      title: "Charlotte's Web",
      author: 'E.B White',
      price: 5.99,
      rating: 5,
      genre: "Children's Fiction"
    }),
    Product.create({
      title: 'The Ginger Man',
      author: 'J.P Donleavy',
      price: 15.79,
      rating: 2,
      genre: 'Unknown'
    })
  ])

  const orders = await Promise.all([
    Order.create({userId: 1}),
    Order.create({userId: 2}),
    Order.create({userId: 3}),
    Order.create({userId: 4}),
    Order.create({userId: 5}),
    Order.create({userId: 6}),
    Order.create({userId: 7}),
    Order.create({userId: 8}),
    Order.create({userId: 9}),
    Order.create({userId: 10}),
    Order.create({userId: 11}),
    Order.create({userId: 12}),
    Order.create({userId: 13}),
    Order.create({userId: 14}),
    Order.create({userId: 15})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${books.length} products`)
  console.log(`seeded ${orders.length} orders`)
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
