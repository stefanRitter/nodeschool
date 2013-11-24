var db;

db.posts.aggregate({
  $group: {
    _id: '$author',
    numComments: {$sum: 1}
  }
});
