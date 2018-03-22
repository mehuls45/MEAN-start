var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;


app.get('/', (req,res) => {
	res.sendFile(__dirname + "/index.html");
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/starter");

app.listen(port, ()=> {
	console.log('Server listening');
});

var schema = new mongoose.Schema({
	fname: String,
	lname: String
});

var User = mongoose.model("User",schema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addname", (req,res)=>{
	var myData = new User(req.body);
	myData.save()
	.then(item => {
		res.send('Item saved to database');
	})
	.catch(err => {
		res.status(400),send('Unable to save to database');
	});

});