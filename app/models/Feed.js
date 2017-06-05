const Feed = Backbone.Model.extend({
  initialize: function (options) {
    if (this.get('url')) {
      this.urlRoot = this.get('url') + 'api/feeds'
    }
  },

  parse: function (response) {
    return response
  }
})

export default Feed
