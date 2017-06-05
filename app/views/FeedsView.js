import FeedView from './FeedView'

const FeedsView = Backbone.Marionette.CollectionView.extend({
  childView: FeedView,
  tagName: 'ul'
})

export default FeedsView
