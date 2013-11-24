
// If you select all the weather documents, you can sort first by state, then by temperature.
// Then you can iterate through the documents and know that whenever the state changes you have
// reached the highest temperature for that state. 


var currentState = '';
var cur = db.data.find().sort({'State':1, 'Temperature':-1});

while(cur.hasNext()) {
	var n = cur.next();
	if (currentState !== n.State) {
		currentState = n.State;
		db.data.update(n, { $set: {month_high: true}});
	}
}
