const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: 3306,
});
// root@localhost:3306
connection.connect((err) => {
	if (err) {
		console.log(err);
		// throw err
		return null;
	}
	console.log('Database Connection Created...');
});

module.exports = connection;
