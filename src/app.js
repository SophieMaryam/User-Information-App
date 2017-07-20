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

//search engine with ajax

app.post("/match", function(req, res){
	fs.readFile(__dirname + "/../resources/users.json", "utf8", function(err,data){
		if(err){
			throw err;
		}

		var obj = JSON.parse(data);
		// console.log(obj);
		
		var ajaxmatch = req.body.result;
		// console.log(ajaxmatch);

		var emptyarray = [];
		var emptystring = "";

		for(var i = 0; i < obj.length; i++){
			if(ajaxmatch === emptystring){
				// console.log("nothing");
			// 	if((ajaxmatch === obj[i].firstname) || (ajaxmatch === obj[i].lastname) || (ajaxmatch === obj[i].email)){
					// this is the same as the line of code below 
			} else if((obj[i].firstname.includes(ajaxmatch)) || (obj[i].lastname.includes(ajaxmatch)) || (obj[i].email.includes(ajaxmatch))){
				var thedata = obj[i].firstname + " " + obj[i].lastname;
				emptyarray.push(thedata);
			}
		};
		res.send(emptyarray);
		// console.log(emptyarray);
	});
});






//the url written here in the post request is more of an id and it conncects the two pages


//renders a search page which displays what you searched
app.post('/searchfound', function(req, res){
	console.log(req.body.name); 

	fs.readFile(__dirname + "/../resources/users.json", "utf8", function(err, data){

		if (err){
	 		throw err;
		} 
	
		var obj = JSON.parse(data); 
		console.log(obj);

		for(var i = 0; i < obj.length; i++) {
			if((req.body.name === obj[i].firstname) || (req.body.name === obj[i].lastname)) { 
				var result = obj[i].firstname + ' ' + obj[i].lastname + "'s email is " + obj[i].email;
			} 
		}
			console.log(result);
			res.render('searchfound', {info:result});
	});	
});

// 	rendering a form page 

app.get('/formpage', function(req, res){
	res.render('formpage')
});

// adding user to user.json file
	
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
});

