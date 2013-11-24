var db;


// hw5-1
db.posts.aggregate([
  {
    $unwind: "$comments"
  },
  {
    $group: {
      _id: '$comments.author',
      numComments: {$sum: 1}
    }
  },
  { $sort: {numComments: -1}},
  {$limit: 1}
]);


// hw5-2
// Please calculate the average population of cities in California (abbreviation CA) and New York (NY)
// (taken together) with populations over 25,000.

// mongoimport -d test -c zips --drop < zips.json
db.zips.aggregate([
  {
    $match: {
      state: "NJ"
    },
  },
  {
    $group: {
      _id: { city: "$city", state: "$state"},
      pop: {$sum: "$pop"}
    }
  },
  {
    $match: {
      pop:{$gt:25000}
    }
  },
  {
    $group: {
      _id: "$_id.state",
      avg: {$avg: "$pop"}
    }
  }
]);

var res = [{
  "_id" : "NY",
  "avg" : 88684.36879432623,
  "_id" : "CA",
  "avg" : 79834.746875
},
{
  "_id" : "CT",
  "avg" : 54108.22222222222,
  "_id" : "NJ",
  "avg" : 47944.77011494253
}];


// hw5-3
// What is the class_id which has the highest average student perfomance?

// You need to group twice to solve this problem. You must figure out the
// GPA that each student has achieved in a class and then average those numbers to get a class average

// mongoimport -d test -c grades --drop < grades.json

db.grades.aggregate([
  {$unwind: "$scores"},
  {
    $match: {
      "scores.type": { $ne: "quiz"}
    }
  },
  {
    $group: {
      _id: {class_id: "$class_id", student_id: "$student_id"},
      average: {$avg: "$scores.score"}
    }
  }, {
    $group: {
      _id: "$_id.class_id",
      average: {$avg: "$average"}
    }
  },
  {$sort: {average: -1}},
  {$limit: 1}
]);

// hw5-4

// Removing Rural Residents In this problem you will calculate the number of people
// who live in a zip code in the US where the city starts with a digit.
// We will take that to mean they don't really live in a city. 

// Using the aggregation framework, calculate the sum total of people who are living in a zip code
// where the city starts with a digit. Choose the answer below. 

var res = db.zips.aggregate([
  {
    $project: {
      first_char: {$substr : ["$city",0,1]},
      pop: 1,
    }   
  },
  {
    $match: {
      first_char: {$regex: /[0-9]/}
    }
  },
  {
    $group: {
      _id: "$first_char",
      pop: {$sum: "$pop"}
    }
  }
]);

var total = 0;
res = res.result;
for(var i = 0; i <= 9; i++) { total += res[i].pop; }
total = 298015;
