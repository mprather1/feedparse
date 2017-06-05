const Feed = Backbone.Model.extend({
  initialize: function (options) {
    if (this.get('url')) {
      this.urlRoot = this.get('url') + 'api/feeds'
    }
  },

  parse: function (response) {
    console.log(response)
    // const createdAt = moment(response.created_at)

    // const object = {
    //   id: response.id,
    //   name: response.name,
    //   attribute: response.attribute,
    //   created_at: createdAt.format('YYYY-MM-DD hh:mm:ss A')
    // }

    return response
  }
})

export default Feed
