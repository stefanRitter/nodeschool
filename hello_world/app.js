var http = require('http'),
	MongoClient = require('mongodb').MongoClient;

/*
var server = http.createServer(function (req, resp) {
	resp.writeHead(200, {'Content-Type': 'text/plain'});
	resp.end('Hello World');
});
*/

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	if (err) throw err;

	db.collection('coll').findOne({}, function(err, doc) {
		if (err) throw err;

		console.dir(doc);
		db.close();
	});

	console.dir('called findOne');
});

// server.listen(8000);
