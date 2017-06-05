import config from './_config'
import express from 'express'
import bodyParser from 'body-parser'
import httpervert from 'httpervert'
import init from 'shintech-init-db'
import helmet from 'helmet'
import path from 'path'
import morgan from 'morgan'
import winston from 'winston-color'
import favicon from 'serve-favicon'
import session from 'express-session'
import passport from 'passport'
import getRouter from './routes'
import pkg from '../package.json'

const _parentDir = path.dirname(__dirname)

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  packageName: pkg.name,
  packageVersion: pkg.version,
  config: config
}

options.db = init(options)

const { app, environment } = options

app.use(helmet())

const server = httpervert(options)
const router = getRouter(options)

const RedisStore = require('connect-redis')(session)
const store = new RedisStore({
  url: config.redisStore.url
})

app.use(session({
  store: store,
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))

require('shintech-init-passport').init(app, passport, options)

app.use(passport.initialize())
app.use(passport.session())

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/css', express.static(path.join(_parentDir, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))

app.get('/loginFailure', function (req, res, next) {
  res.sendFile('login-failure.html', { root: './' })
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/loginFailure'
}))

if (environment !== 'test') {
  app.use(morgan('dev'))
}

app.use('/api', router)

const serverConfig = {
  server: server,
  options: options
}

export default serverConfig
