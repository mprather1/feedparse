import Marionette from 'marionette'
import Feeds from './collections/Feeds'
import FeedsView from './views/FeedsView'
import Config from 'shintech-config'
import config from './_config'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
    this.config = new Config(config)
  },

  index: function (page) {
    const app = this.app

    const feeds = new Feeds([], { config: this.config })

    this.feeds = feeds

    feeds.fetch({
      success: function (data) {
        console.log('Successfully fetched data...')
        app.view.showChildView('main', new FeedsView({ collection: feeds }))
      },

      error: function (err) {
        console.log(err)
      }
    })
  }
})

export default Controller
