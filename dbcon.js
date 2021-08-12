var mysql = require('mysql');

// var pool = mysql.createPool(
// {
// 	connectionLimit : 10,
// 	host            : '34.72.179.155',
// 	user            : 'root', 	
// 	password        : 'jobtracker',	
// 	database        : 'JobTracker',
//     socketPath: '/cloudsql/job-tracker-311522:us-central1:job-tracker-instance'

	// DO NOT DELETE. using for my local testing. -Gary

var pool = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'JobTracker'
});

pool.connect(function (error) {
	if (error) {
		console.log(error);
	}
	else {
		console.log('Connected');
	}
});


module.exports.pool = pool;