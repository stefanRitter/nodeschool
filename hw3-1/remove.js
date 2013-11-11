
var MongoClient = require('mongodb').MongoClient;
// connect to database
MongoClient.connect('mongodb://localhost/school', function(err, db) {
  'use strict';
  if (err) { throw err; }
  var students = db.collection('students');
  
  students.find().toArray(function(err, items) {
    for (var i = 0, len = items.length; i < len; i++) {
      var student = items[i];
      var scores = student.scores;
      var lowestscore = { type: 'homework', score: 10000000000 };
      var index = -1;
      
      for (var j = 0, l = scores.length; j < l; j++) {
        if (scores[j].type === 'homework' && scores[j].score < lowestscore.score) {
          lowestscore = scores[j];
          index = j;
        }
      }
      console.log(scores);

      if (index !== -1) { scores.splice(index, 1); }
      
      console.log(scores);
      console.log(student.name + ': ' + lowestscore.score);

      students.update({_id: student._id}, {$set: {scores: scores}}, function(err, doc) {
        if (err) { throw err; }
      });
    }
  });
});