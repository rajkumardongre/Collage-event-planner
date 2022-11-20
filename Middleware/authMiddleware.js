const jwt = require('jsonwebtoken');
// const Employee = require('../model/Employee.model');
const connection = require('../DB/Connection');
require('dotenv').config();

const requireAdminAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// check json web token exists & is verified
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				console.log('decoded Token', decodedToken);
				if (decodedToken.email == process.env.ADMIN_EMAIL) {
					next();
				} else {
					res.render('login', {
						msg: 'Access Denied',
					});
				}
				// req.user = decodedToken
			}
		});
	} else {
		res.render('login', { msg: 'Access Denied' });
	}
};

const requireClubAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// check json web token exists & is verified
	// console.log('Checking Token in requireClubAuth');
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.render('login', {
					msg: 'Access Denied',
				});
			} else {
				// console.log('Decoded Token id : ', decodedToken.id);
				let query = 'SELECT * FROM clubs where id=' + decodedToken.id;
				connection.query(query, (err, result) => {
					if (result.length == 0) {
						res.render('login', {
							msg: 'Access Denied',
						});
					} else {
						// res.send(result)
						// console.log('Calling next()');
						req.ClubID = decodedToken.id;
						next();
					}
				});
			}
		});
	} else {
		res.render('login', { msg: 'Access Denied' });
	}
};

module.exports = {
	requireClubAuth,
	requireAdminAuth,
};
