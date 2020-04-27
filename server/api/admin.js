const router = require('express').Router()
const {User} = require('../db/models')

async function admin(req, res, next) {
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  })

  if (!user.admin()) {
    res.json('You do not have access to this')
  }
  next()
}

router.get('/users', admin, async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  } catch (error) {
    next(error)
  }
})

router.delete('/users/delete/:userId', admin, async (req, res, next) => {
  try {
    const userToDelete = await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.json(userToDelete)
  } catch (error) {
    next(error)
  }
})
