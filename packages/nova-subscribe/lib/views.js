import Posts from 'nova-posts';

Posts.views.add("userSubscribedPosts", function (terms) {
  var user = Meteor.users.findOne(terms.userId),
      postsIds = [];

  if (user && user.telescope.subscribedItems && user.telescope.subscribedItems.Posts) {
    postsIds = _.pluck(user.telescope.subscribedItems.Posts, "itemId");
  }

  return {
    selector: {_id: {$in: postsIds}},
    options: {limit: 5, sort: {postedAt: -1}}
  };
});