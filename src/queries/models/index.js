import FeedParser from 'feedparser'
import request from 'request'

const queries = {}

export default function getAllRoutes (options) {
  queries.getAllModels = (req, res, next) => {
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

  return queries
}
