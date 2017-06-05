import Feed from '../models/Feed'

const Feeds = Backbone.Collection.extend({
  model: Feed,
  initialize: function (feed, options) {
    const config = options.config

    this.config = options.config
    this.url = config.getConfig('url') + 'api/feeds'
  },

  parse: function (response) {
    return response.body
  }
})

export default Feeds
