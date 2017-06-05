import FeedParser from 'feedparser'
import request from 'request'

const queries = {}

export default function getAllRoutes (options) {
  const {db} = options

  queries.getAllModels = (req, res, next) => {
    console.log('req')
    var reqf = request('http://feeds.bbci.co.uk/news/rss.xml')
    var feedparser = new FeedParser()

    reqf.on('response', function () {
      var stream = this
      if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'))
      } else {
        stream.pipe(feedparser)
      }
    })

    var body = []

    feedparser.on('readable', function (data) {
      var stream = this
      var meta = this.meta // eslint-disable-line
      var item

      while (item = stream.read()) { // eslint-disable-line
        body.push(item)
      }
    })

    feedparser.on('end', function () {
      res.status(200)
      .json({
        body: body
      })
    })
  }

  queries.createModel = (req, res, next) => {
    db.none('insert into models( name, attribute )' + 'values( ${name}, ${attribute} )', req.body) // eslint-disable-line
    .then(function () {
      res.status(200)
      .json({
        status: 'success',
        message: 'Inserted one model...'
      })
    })
    .catch(function (err) {
      return next(err)
    })
  }

  queries.getSingleModel = (req, res, next) => {
    const modelID = parseInt(req.params.id)
    db.one('select * from models where id = $1', modelID)
    .then(function (data) {
      res.status(200)
      .json(data)
    })
    .catch(function (err) {
      return next(err)
    })
  }

  queries.updateSingleModel = (req, res, next) => {
    const modelID = parseInt(req.params.id)
    db.none('update models set name=$1, attribute=$2 where id=$3', [req.body.name, req.body.attribute, modelID])
    .then(function (done) {
      res.status(200)
      .json({
        status: 'success',
        message: 'Updated one model...'
      })
    })
    .catch(function (err) {
      return next(err)
    })
  }

  queries.removeModel = (req, res, next) => {
    var modelID = parseInt(req.params.id)
    db.result('delete from models where id = $1', modelID)
    .then(function (data) {
      res.status(200)
      .json({
        status: 'success',
        message: `Removed ${data.rowCount} model`
      })
    })
    .catch(function (err) {
      return next(err)
    })
  }

  return queries
}
