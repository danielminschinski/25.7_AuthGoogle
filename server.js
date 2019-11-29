var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var app = express();
var googleProfile = {};

passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

passport.use(new GoogleStrategy({
		clientID: config.GOOGLE_CLIENT_ID,
		clientSecret: config.GOOGLE_CLIENT_SECRET,
		callbackURL: config.CALLBACK_URL
	},
	function (accessToken, refreshToken, profile, callback) {
		googleProfile = {
			id: profile.id,
			displayName: profile.displayName
		};
		callback(null, profile);
	}
));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());

//app routes
app.get('/', function(req, res){
    res.render('index', { user: req.user });
});

app.get('/logged', function(req, res){
    res.render('logged', { user: googleProfile });
});
//Passport routes
app.get('/auth/google',
passport.authenticate('google', {
scope : ['profile', 'email']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/'
    }));

app.listen(3000);













/*app.get('/', function (req, res){
	res.sendFile('/index.html');
});

app.get('/userform', function(req, res){
	const response = {
		first_name: req.query.first_name,
		last_name: req.query.last_name
	};
	res.json(response);
});*/



/*var server = app.listen(3000, 'localhost', function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});*/



/*const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
let stringifyFile;

app.use(bodyParser.json());

app.get('/getNote', function(req, res){
	fs.readFile('./test.json', 'utf-8', function(err, data){
		if(err) throw err;
		stringifyFile = data;
		res.send(data);
	});
});

app.post('/updateNote/:note', function(req, res){
	fs.readFile('./test.json', 'utf-8', function(err, data){
		stringifyFile = req.params.note + data;
		fs.writeFile('./test.json', stringifyFile, function(err){
			if (err) throw err;
			console.log('file updated');
		});
	});
});

app.listen(3000);*/










/*var express = require('express');
var app = express();

app.get('/', function(req, res){
	console.log('Otrzymałem żądanie GET do strony głównej');
	res.send('Hello World!');
});


app.get('/:id', function(req, res){
	console.log('Otrzymałem żądanie GET do strony głównej');
	res.send('Identyfikator, który został dopisany to ' + req.params.id);
});

/*app.get('/', function(req, res){
	console.log('Otrzymałem żądanie GET do strony głównej');
	res.send('Hello GET!');
});

app.post('/', function(req, res){
	console.log('Otrzymałem żądanie POST do strony głównej');
	res.send('Hello POST!');
});

app.delete('/del_user', function(req, res){
	console.log('Otrzymałem żądanie DELETE do strony /del_user');
	res.send('Hello DELETE!');
});

app.get('/list_user', function(req, res){
	console.log('Otrzymałem żądanie GET do strony /listen_user');
	res.send('Strona z listą użytkowników');
});

app.get('/ab*cd', function(req, res){
	console.log('Otrzymałem żądanie GET do strony /ab*cd');
	res.send('Wzór pasuje');
})


/*var server = app.listen(3000, function(){
	console.log('Przykładowa aplikacja nasłuchuje na http://localhost:3000');
});

app.listen(3000);

app.use(function (req, res, next){
	res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});*/