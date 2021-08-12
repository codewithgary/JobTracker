
var mysql = require('./dbcon.js');
var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var hbs = require('handlebars');
var fs = require ('fs');
var flash = require('connect-flash');

app.engine('hbs', exphbs({
	extname: '.hbs',
	defaultLayout: null
}));
app.set('view engine', 'hbs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));


hbs.registerPartial('menu', fs.readFileSync(__dirname + '/views/menu.hbs', 'utf-8'));


// routes
var routes = require('./routes/index.js');
app.use('/', routes);

app.get('/signout', function (request, response) {
	request.session.destroy();
	response.redirect('login');
});

app.post('/auth', function (request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		mysql.pool.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
			console.log(email);
			console.log(password);
			if (results != null && results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				request.session.userid = results[0].id;
				response.redirect('/');
			} else {
				request.flash('error', 'Invalid email or password. Please try again.');
				return response.redirect('/login');		
			}
			response.end();
		});
	} else {
		response.send('Please enter Email and Password!');
		response.end();
	}
});

app.get('/register', function(request, response) {
	response.render('register', { message: request.flash('error') });
});

app.post('/register', function (request, response) {
	var email = request.body.email;
	var password = request.body.password;
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;

	if (email) {
		mysql.pool.query('SELECT * FROM User WHERE email = ?', [email], function(error, results, fields) {
			if (results != null && results.length > 0) {
				request.flash('error', 'This email adddress is already in use.  Please use a different email to register.');
				return response.redirect('/register');
			} else {
				var sql = "INSERT INTO User (email, password, firstname, lastname) VALUES ('" + email + "', '" + password + "','" + firstname + "','" + lastname + "')";
				mysql.pool.query(sql, function (err, result) {
					if (err) throw err;
					console.log("inserted");
					response.redirect('/');
					response.end();
				});
			}
		});
	}

});

app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.render('/');
	} else {
		response.send('Please login to view this page!');
	}
});

app.get('/', function(req, res) {
	mysql.pool.query('SELECT * FROM Job', function (err, rows, fields) {
		var jobs = [];
		for (var i in rows) {
			jobs.push({ 'id': rows[i].id, 'title': rows[i].title, 'company': rows[i].company, 'city': rows[i].city, 'state': rows[i].state, 'country': rows[i].country, 'description': rows[i].description, 'status': rows[i].status })
		}
		console.log(jobs);
		res.send(jobs);
	});
});

app.get('/get-job-list', function (req, res) {
	mysql.pool.query('SELECT * FROM Job j LEFT JOIN JobApplicant ja on j.id = ja.jobid GROUP BY j.id', function (err, rows, fields) {
		var jobs = [];
		for (var i in rows) {
			let applied = false;
			if (rows[i].userid != null && (rows[i].userid === req.session.userid)) {
				applied = true;
			}
			jobs.push({ 'id': rows[i].id, 'title': rows[i].title, 'company': rows[i].company, 'city': rows[i].city, 'state': rows[i].state, 'country': rows[i].country, 'description': rows[i].description, 'status': rows[i].status, 'skill1': rows[i].skill_1, 'skill2': rows[i].skill_2, 'skill3': rows[i].skill_3, 'skill4': rows[i].skill_4, 'skill5': rows[i].skill_5, 'applied': applied, 'userid': req.session.userid })
		}
		console.log(jobs);
		res.send(jobs);
	})
});

app.post('/apply', function (req, res) {
	var userid = req.body.userid;
	var jobid = req.body.jobid;

	if (userid && jobid) {
		mysql.pool.query(`INSERT INTO JobApplicant (jobid, userid) VALUES (${jobid}, ${userid})`, function (err, rows, fields) {
			if (err) {
				console.log(err);
				res.end();
			}
			res.redirect('/');
		})
	}
	else {
		res.redirect('/');
	}
});


app.get('/create', function (request, response) {
	if (request.session.loggedin) {
		response.render('create');
	} else {
		response.send('Please login to view this page!');
	}
});


app.post('/create', function (request, response) {

	var title = request.body.title;
	var compayname = request.body.company;
	var city = request.body.city;
	var state = request.body.state;
	var country = request.body.country;
	var jobdescription = request.body.description;
	var skill_1 = request.body.skill_1;
	var skill_2 = request.body.skill_2;
	var skill_3 = request.body.skill_3;
	var skill_4 = request.body.skill_4;
	var skill_5 = request.body.skill_5;

	var email = request.session.email ;


	var sql = "INSERT INTO Job (title, company, city, state, country, description, status, skill1, skill2, skill3, skill4, skill5, email) VALUES ('" + title + "', '" + compayname + "','" + city + "','" + state + "','" + country + "','" + jobdescription + "','OPEN', '" + skill_1 + "','" + skill_2 + "','" + skill_3 + "','" + skill_4 + "','" + skill_5 + "', '" + email + "')";
	mysql.pool.query(sql, function (err, result) {
		if (err) throw err;
		console.log("inserted");
		response.redirect('/');
		response.end();
	});
});


// ---------------- Contacts Table
// get contacts data 
app.get('/contactlist', function (req, res) {

	var uemail = req.session.email;
	var sql = "SELECT * FROM Contacts WHERE userEmail = ?";
	mysql.pool.query(sql, [uemail], function (err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.render('contacts', { rows });
			console.log(rows);
		}
		console.log('The data from contacts table: \n', rows)
	});

});

// delete contact data by ID
app.get('/deletecontact/:contactID', function (req, res) {
	var sql = "DELETE FROM Contacts WHERE contactID = ?";
	mysql.pool.query(sql, [req.params.contactID], function (err, data) {
		if (err) {
			console.log(err);
		}
		else {
			res.redirect('/contactlist');
			console.log("contact deleted");
		}
	});

});

// add new contacts
app.post('/contacts', function (req, res) {
	var uemail = req.session.email;
	var { userEmail, fname, lname, info, email, phoneNumber } = req.body;

	var sql = "INSERT INTO Contacts (userEmail, fname, lname, info, email, phoneNumber) VALUES ('" + uemail + "', '" + fname + "', '" + lname + "', '" + info + "' , '" + email + "','" + phoneNumber + "')";

	mysql.pool.query(sql, [userEmail, fname, lname, info, email, phoneNumber], function (err, data) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			res.redirect('/contactlist');
			console.log("data inserted");
		}
	});
});

app.get('/info', function(req, res) {
	mysql.pool.query(`SELECT * FROM  User WHERE id = ${req.session.userid}`, function(err, rows) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			if (rows != null)
			{
				let user = {
					firstname : rows[0].firstname,
					lastname : rows[0].lastname,
					city : rows[0].city,
					state : rows[0].state,
					country : rows[0].country,
					role : rows[0].role,
					company : rows[0].company,
					schoolinfo : rows[0].schoolinfo 
				}
				console.log(user);
				res.send(user);
			}
		}
	});
});

console.log("Running on http://localhost:8081/")
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});

