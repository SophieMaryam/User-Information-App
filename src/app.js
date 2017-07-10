const express = require('express');
const app = express();

const fs = require('fs');

const bodyParser = require("body-parser");


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.use(express.static(__dirname + "/../public"));

app.use('/', bodyParser.urlencoded({extended: true}));




//rendering the homepage
app.get('/', function (req, res) {
	res.render('index');
	
}); 



//rendering users page and reading the users file
app.get('/users', function (req, res) {

	fs.readFile(__dirname + "/../resources/users.json", "utf8", function(err, data) {
	
		if (err) {
		 	throw err;
		} 
		
		var obj = JSON.parse(data); 
		res.render('user', {
			users: obj

		});
		
		console.log(obj);
		
	});
});



//rendering the search page
app.get('/search', function (req, res) {
	res.render('search')

});


//renders a search page which displays what you searched
app.post('/searchfound', function(req, res){
	console.log(req.body.name); //this will produce the name you typed in the search engine in the console

	fs.readFile(__dirname + "/../resources/users.json", "utf8", function(err, data){

		if (err){
	 		throw err;
		} 
	
		var obj = JSON.parse(data); 
		console.log(obj);

		for(var i = 0; i < obj.length; i++) {
			//.length gives you the length of an array (number form)
			if((req.body.name === obj[i].firstname) || (req.body.name === obj[i].lastname)) { 
				var result = obj[i].firstname + ' ' + obj[i].lastname + "'s email is " + obj[i].email;
			}
			
		}
			console.log(result);
			res.render('searchfound', {info:result});
	});	

});

// 	rendering a form page to fill in 
//  renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.

app.get('/formpage', function(req, res){
	res.render('formpage')
});
	
app.post('/formpageinfo', function(req, res){
	console.log(req.body);

	fs.readFile(__dirname + "/../resources/users.json", "utf8", function(err, data){

	if (err){
	 	throw err;
	} 

	var obj = JSON.parse(data); 
	var newUserData = req.body;

	obj.push(newUserData);
	console.log(obj);

	var completeusers = JSON.stringify(obj);
	console.log(completeusers);

	// This turns the JSON file into an array of objects 
	// you do this because its harder to modify the JSON file 

	// console.log('Data from JSON file: '+ text);
	//What do I have inside my JSON file? jSON 	
		// When you parse it, it becomes an array of objects 
	//What data type am I reading from the JSON file? Array of objects 
	//What data type am I trying to send to the JSON file?
	
	
		fs.writeFile(__dirname + "/../resources/users.json", completeusers, function(err){
			if(err){
				throw err;
			}
			res.redirect('/');
		});
	});

});

var server = app.listen(3000, function(req, res){
	console.log('Example app listening on port: ' + server.address().port);
	// console.log(__dirname);
});

