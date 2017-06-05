import express from 'express'
import {models, users} from './queries'

export default function getRouter (options) {
  const router = express.Router()

// Models

  router.route('/models')
    .get(models(options).getAllModels)
    .post(models(options).createModel)

  router.route('/models/:id')
    .get(models(options).getSingleModel)
    .put(models(options).updateSingleModel)
    .delete(models(options).removeModel)

// Users

  router.route('/users')
    .get(users(options).getAllUsers)
    .post(users(options).createUser)

  router.route('/users/:id')
    .get(users(options).getSingleUser)
    .put(users(options).updateUser)
    .delete(users(options).removeUser)

  return router
}
