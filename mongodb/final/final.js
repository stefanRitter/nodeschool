

// enron messages count

db.messages.find({ "headers.From": "andrew.fastow@enron.com", "headers.To": "jeff.skilling@enron.com"});

db.messages.count({ "headers.From": "andrew.fastow@enron.com", "headers.To": "john.lavorato@enron.com"});


// enron update

// Please add the email address "mrpotatohead@mongodb.com" to the list of addresses in 
// the "headers.To" array for the document with "headers.Message-ID" of 
// "<8147308.1075851042335.JavaMail.evans@thyme>" 