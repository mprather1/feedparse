import express from 'express'
import {feeds} from './queries'

export default function getRouter (options) {
  const router = express.Router()

// feeds

  router.route('/feeds')
    .get(feeds(options).getAllFeeds)

  return router
}
