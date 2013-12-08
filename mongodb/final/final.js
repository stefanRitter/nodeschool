var db;

// enron messages count

db.messages.find({ "headers.From": "andrew.fastow@enron.com", "headers.To": "jeff.skilling@enron.com"});

db.messages.count({ "headers.From": "andrew.fastow@enron.com", "headers.To": "john.lavorato@enron.com"});


// enron update

// Please add the email address "mrpotatohead@mongodb.com" to the list of addresses in 
// the "headers.To" array for the document with "headers.Message-ID" of 
// "<8147308.1075851042335.JavaMail.evans@thyme>"

db.messages.find({"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"}).pretty()

db.messages.update({"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"},
  {$push: {"headers.To": "mrpotatohead@mongodb.com"}});



// blog update num_likes

db.posts.update({permalink:"mxwnnnqaflufnqwlekfd"}, {"$inc": {"comments.0.num_likes": 1}});