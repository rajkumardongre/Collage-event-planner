const connection = require('../DB/Connection');

module.exports.home = (req, res, next) => {
	try {
		let query = 'SELECT * FROM events';
		connection.query(query, (err, result) => {
			if (result == undefined) {
				res.render('index', {
					msg: 'Currently there is no Events',
					result,
				});
			} else {
				res.render('index', { msg: '', result });
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

const formatDate = (date) => {
	return `${date}`.split('-').reverse().join('/');
};

module.exports.eventDetail = (req, res, next) => {
	try {
		const eventID = req.params.id;
		let query = 'SELECT * FROM events WHERE id=' + eventID;
		connection.query(query, (err, result) => {
			if (result.length == 0) {
				res.render('eventDetail', {
					msg: 'No Event Details Found',
					result: undefined,
				});
			} else {
				result = result[0];
				result.registrationStartDate = new Date(
					formatDate(result.registrationStartDate)
				);
				result.registrationEndDate = new Date(
					formatDate(result.registrationEndDate)
				);
				result.publishOn = new Date(formatDate(result.publishOn));
				res.render('eventDetail', { msg: '', result });
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.registerEvent_get = (req, res, next) => {
	try {
		const eventID = req.params.id;
		let query = 'SELECT * FROM events WHERE id=' + eventID;
		connection.query(query, (err, result) => {
			if (result.length == 0) {
				res.render('registerToEvent', {
					msg: 'No Event Found to Register',
					result: undefined,
				});
			} else {
				result = result[0];
				res.render('registerToEvent', { msg: '', result });
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.registerEvent_post = (req, res, next) => {
	try {
		let eventID = req.params.id;
		let query = 'SELECT * FROM events WHERE id=' + eventID;
		connection.query(query, (err, result) => {
			if (result.length == 0) {
				res.render('registerToEvent', {
					msg: 'No Event Found to Register',
					result: undefined,
				});
			} else {
				result = result[0];
				eventID = parseInt(eventID);
				const clubID = parseInt(result.clubID);
				const name = req.body.name;
				const phoneNumber = req.body.phoneNumber;
				const email = req.body.email;
				const prnNumber = req.body.prnNumber;
				const year = parseInt(req.body.year);
				const division = req.body.division;

				query =
					'INSERT INTO registrations (clubID, eventID, name, phoneNumber, email, prnNumber, year, division) values (?, ?, ?, ?, ?, ?, ?, ?)';
				const queryValue = [
                    clubID,
                    eventID,
					name,
					phoneNumber,
					email,
					prnNumber,
					year,
					division,
				];
				connection.query(query, queryValue, (err, result2) => {
					if (err) {
						console.log('Errrrrror!!!  -> ', err);
						res.send(err);
					} else {
						console.log(result2);
                        res.render('registerToEvent', { msg: 'You have Register Successfully', result });
					}
				});

			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.allEvents_get = (req, res, next) => {
	try {
		// const search = req.params.search || '';
		let query = `SELECT * FROM events`;
		connection.query(query, (err, result) => {
			if (!result) {
				res.render('allEvents', {
					msg: 'Currently there is no Events',
					result,
				});
			} else {
				res.render('allEvents', { msg: '', result });
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.eventSearch_post = (req, res, next) => {
	try {
		const search = req.body.search;
		let query = `SELECT * FROM events WHERE title LIKE '%${search}%' OR description LIKE '%${search}%' OR shortDescription LIKE '%${search}%' OR club LIKE '%${search}%'`;
		connection.query(query, (err, result) => {
			if (result.length == 0) {
				res.render('allEvents', {
					msg: 'No Event Found',
					result,
				});
			} else {

				res.render('allEvents', { msg: '', result });
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};