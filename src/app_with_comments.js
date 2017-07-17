const express = require('express');
//installing/loading express/which is a module

const app = express();
// you are calling on express to run it

const fs = require('fs');
// requiring fs
// you use the word const because its a constant throughout the whole page 
// const is just interchangeable with var when its constant	


const bodyParser = require("body-parser");
// require is a module loader 
// bodyParser is a 

app.set('views', __dirname + '/views');
	// first parameter is what we are setting
	// second parameter is the folder 
app.set('view engine', 'pug');
// this is linking your pug files to this page
// this is saying we are using a view engine, and that view engine is pug 


app.use(express.static(__dirname + "/../public"));
// The files are all in different folders so all of this is needed to access it

app.use('/', bodyParser.urlencoded({extended: true}));
// it takes info from a form and makes it readable (bodyParser.urlencoded)

app.get('/', function (req, res) {
	res.render('index');
	// "/" this is called the path/route
	// the rest is the handler

}); 
// this needs to be done when the users tries to request the homepage ('/')
// they are given the information on the pug file index

app.get('/users', function (req, res) {

	fs.readFile(__dirname + "/../resources/users.json", "utf8", function(err, data) {
	//file system module allows you to work with the file system on your computer
	// common uses for file system module i.e. read files, create files, updates files 
		
		if (err) {
		 	throw err;
		} 
	
		var obj = JSON.parse(data); 
		res.render('user', {
			users: obj
		// first parameter is the pug file, the second parameter is the data 
		});
		console.log(obj);
	});
});

app.get('/search', function (req, res) {
	res.render('search')

});

// you need a post request so the server can receive data 
// you then need it to compare the request with the information in users.json
// it needs to find a similar search
// if it finds it, it needs to send it back to the user 

// rendering a search page which displays whether you found the user or not
app.post('/searchresult', function(req, res){
	console.log(req.body); //this will produce the name you typed in the search engine in the console
	
	fs.readFile(__dirname + "/../resources/users.json", "utf8", function(err, data){

	if (err) {
	 	throw err;
	} 
	
	var obj = JSON.parse(data); 
	// This makes the json file readable - it turns it into an array of objects so it can be modified because its now in javascript syntax
	console.log(obj);
	// This produces the json file as an array of objects in the console

	for(var i = 0; i < obj.length; i++) {
		//.length gives you the length of an array (number form)
		if(req.body.name === obj[i].firstname || req.body.name === obj[i].lastname) { 
			var result = obj[i].firstname + ' ' + obj[i].lastname + "'s email is " + obj[i].email;
			// adding strings and variables = concatinate 
			}
		}
			console.log(result);
			res.render('searchfound', {info:result})
	});

	// you have two pages because you can't have a post and get request ont he same page
	
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
	// console.log(__dirname); // this will show you which folder your app.js is within 
});

//COMMENTS

// so on another page you want the user information to be rendered and displayed
// for this you will need to first create the app.get so when the users requests /user an action occurs
// you have to render the information from the page your pug page which is user
// you only write user or index with no .pug because it knows that it is a pug file
// then the server needs to read what is on the json page so you use the readFile
// you always throw in an error
// since its a json file - you need to parse it 



