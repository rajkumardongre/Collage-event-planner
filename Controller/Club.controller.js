const connection = require('../DB/Connection');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

module.exports.addEvent_get = (req, res, next) => {
	try {
		// const employee = await Employee.login(email, password);
		let query = 'SELECT * FROM clubs where id=' + req.ClubID;
		connection.query(query, (err, result) => {
			if (result.length == 0) {
				res.render('login', {
					msg: 'Invalid Credentials',
				});
			} else {
				// res.send(result)
				const club = result[0];
				const context = {
					name: club.name,
					id: club.id,
				};
				res.render('addEvent', context);
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.addEvent_post = (req, res, next) => {
	// console.log('inside add event post');
	try {
		let query = 'SELECT * FROM clubs where id=' + req.ClubID;
		connection.query(query, (err, result) => {
			if (result.length == 0) {
				res.render('login', {
					msg: 'Invalid Credentials',
				});
			} else {
				// console.log(result[0].name);
				let newEvent = {
					clubID: req.ClubID,
					title: req.body.title,
					shortDescription: req.body.shortDescription,
					description: req.body.description,
					fees: parseInt(req.body.fees),
					club: result[0].name,
					contactName: req.body.contactName,
					contactPhoneNumber: req.body.contactPhoneNumber,
					registrationStartDate: new Date(req.body.registrationStartDate),
					registrationEndDate: new Date(req.body.registrationEndDate),
					sanitizedHtml: dompurify.sanitize(marked.parse(req.body.description)),
				};
				// newEvent.sanitizedHtml = dompurify.sanitize(
				// 	marked(newEvent.description)
				// );
				console.log('Start Executing Query');

				query =
					'INSERT INTO events (clubID, title, shortDescription, description, sanitizedHtml, fees, club, contactName, contactPhoneNumber, registrationStartDate, registrationEndDate) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				const queryValue = [
					newEvent.clubID,
					newEvent.title,
					newEvent.shortDescription,
					newEvent.description,
					newEvent.sanitizedHtml,
					newEvent.fees,
					newEvent.club,
					newEvent.contactName,
					newEvent.contactPhoneNumber,
					newEvent.registrationStartDate,
					newEvent.registrationEndDate,
				];
				connection.query(query, queryValue, (err, result) => {
					if (err) {
						console.log('Errrrrror!!!  -> ', err);
						res.redirect(`/club/event/add`);
					} else {
						// console.log(result);
						res.redirect(`/event/${result.insertId}`);
					}
				});
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.allEvent_get = (req, res, next) => {
	try {
		// const employee = await Employee.login(email, password);
		let query = 'SELECT * FROM clubs where id=' + req.ClubID;
		connection.query(query, (err, result2) => {
			if (result2.length == 0) {
				res.render('login', {
					msg: 'Invalid Credentials',
				});
			} else {
				let query = 'SELECT * FROM events where clubID=' + req.ClubID;
				connection.query(query, (err, result) => {
					if (result.length == 0) {
						res.render('clubAllEvent', {
							msg: 'Currently You have no Events',
							result,
							name: result2[0].name,
						});
					} else {
						res.render('clubAllEvent', {
							msg: '',
							result,
							name: result2[0].name,
						});
					}
				});
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

const htmlDateFormat = (date) => {
	// 9/11/2022
	date = '' + date;
	const arr = date.split('/');
	if (arr[0].length == 1) {
		arr[0] = '0' + arr[0];
	}
	if (arr[1].length == 1) {
		arr[1] = '0' + arr[1];
	}
	return arr.reverse().join('-');
};

module.exports.editEvent_get = (req, res, next) => {
	// console.log('inside add event post');
	try {
		let query = 'SELECT * FROM clubs where id=' + req.ClubID;
		connection.query(query, (err, result2) => {
			if (result2.length == 0) {
				res.render('login', {
					msg: 'Invalid Credentials',
				});
			} else {
				query = 'SELECT * FROM events WHERE id=' + req.params.id;
				connection.query(query, (err, result) => {
					if (result.length == 0) {
						res.render('editEvent', {
							msg: 'No Event Details Found',
							data: undefined,
							name: result2[0].name,
						});
					} else {
						oldEvent = result[0];
						let data = {
							id: oldEvent.id,
							clubID: oldEvent.ClubID,
							title: oldEvent.title,
							shortDescription: oldEvent.shortDescription,
							description: oldEvent.description,
							fees: parseInt(oldEvent.fees),
							club: result2[0].name,
							contactName: oldEvent.contactName,
							contactPhoneNumber: oldEvent.contactPhoneNumber,
							registrationStartDate: new Date(oldEvent.registrationStartDate),
							registrationEndDate: new Date(oldEvent.registrationEndDate),
						};
						// console.log(data.registrationStartDate.toLocaleDateString())
						data.registrationStartDate = htmlDateFormat(
							data.registrationStartDate.toLocaleDateString()
						);
						data.registrationEndDate = htmlDateFormat(
							data.registrationEndDate.toLocaleDateString()
						);
						res.render('editEvent', { msg: '', data, name: result2[0].name });
						// newEvent.sanitizedHtml = dompurify.sanitize(
						// 	marked(newEvent.description)
						// );
						// console.log('Start Executing Query');

						// query =
						// 	'INSERT INTO events (clubID, title, shortDescription, description, sanitizedHtml, fees, club, contactName, contactPhoneNumber, registrationStartDate, registrationEndDate) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
						// const queryValue = [
						// 	newEvent.clubID,
						// 	newEvent.title,
						// 	newEvent.shortDescription,
						// 	newEvent.description,
						// 	newEvent.sanitizedHtml,
						// 	newEvent.fees,
						// 	newEvent.club,
						// 	newEvent.contactName,
						// 	newEvent.contactPhoneNumber,
						// 	newEvent.registrationStartDate,
						// 	newEvent.registrationEndDate,
						// ];
						// connection.query(query, queryValue, (err, result) => {
						// 	if (err) {
						// 		console.log('Errrrrror!!!  -> ', err);
						// 		res.send(err);
						// 	} else {
						// 		console.log(result);
						// 		res.send(result);
						// 	}
						// });
					}
				});
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.editEvent_post = (req, res, next) => {
	// console.log('inside add event post');
	try {
		let query = 'SELECT * FROM clubs where id=' + req.ClubID;
		connection.query(query, (err, result2) => {
			if (result2.length == 0) {
				res.render('login', {
					msg: 'Invalid Credentials',
				});
			} else {
				query = 'SELECT * FROM events WHERE id=' + req.params.id;
				connection.query(query, (err, result) => {
					if (result.length == 0) {
						res.render('editEvent', {
							msg: 'No Event Details Found',
							data: undefined,
							name: result2[0].name,
						});
					} else {
						let updatedEvent = {
							clubID: req.ClubID,
							title: req.body.title,
							shortDescription: req.body.shortDescription,
							description: req.body.description,
							fees: parseInt(req.body.fees),
							club: result[0].name,
							contactName: req.body.contactName,
							contactPhoneNumber: req.body.contactPhoneNumber,
							registrationStartDate: new Date(req.body.registrationStartDate),
							registrationEndDate: new Date(req.body.registrationEndDate),
							sanitizedHtml: dompurify.sanitize(
								marked.parse(req.body.description.trim())
							),
						};
						// newEvent.sanitizedHtml = dompurify.sanitize(
						// 	marked(newEvent.description)
						// );
						console.log('Start Executing Updating Query');

						query =
							'UPDATE events SET clubID=?, title=?, shortDescription=?, description=?, sanitizedHtml=?, fees=?, club=?, contactName=?, contactPhoneNumber=?, registrationStartDate=?, registrationEndDate=? WHERE id=' +
							req.params.id;
						const queryValue = [
							updatedEvent.clubID,
							updatedEvent.title,
							updatedEvent.shortDescription,
							updatedEvent.description,
							updatedEvent.sanitizedHtml,
							updatedEvent.fees,
							updatedEvent.club,
							updatedEvent.contactName,
							updatedEvent.contactPhoneNumber,
							updatedEvent.registrationStartDate,
							updatedEvent.registrationEndDate,
						];
						connection.query(query, queryValue, (err, result) => {
							if (err) {
								console.log('Errrrrror!!!  -> ', err);
								res.send(err);
							} else {
								console.log(result);
								// res.send(result);
								res.redirect(`/event/${req.params.id}`);
							}
						});
					}
				});
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};

module.exports.eventRegistrations_get = (req, res, next) => {
	try {
		// const employee = await Employee.login(email, password);
		let query = 'SELECT * FROM clubs where id=' + req.ClubID;
		connection.query(query, (err, result2) => {
			if (result2.length == 0) {
				res.render('login', {
					msg: 'Invalid Credentials',
				});
			} else {
				let query = 'SELECT * FROM registrations where eventID=' + parseInt(req.params.id);
				connection.query(query, (err, result) => {
					if (result.length == 0) {
						res.render('clubAllRegistration', {
							msg: 'Currently You have no Registration',
							result ,
							title : '',
							name: result2[0].name,
						});
					} else {
						query = 'SELECT * FROM events WHERE id=' + parseInt(req.params.id);
						connection.query(query, (err, result3) => { 
							res.render('clubAllRegistration', {
								msg: '',
								result,
								title : result3[0].title,
								name: result2[0].name,
							});
						})
					}
				});
			}
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
};