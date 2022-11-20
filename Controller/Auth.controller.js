// const Employee = require("../model/Employee.model");
const jwt = require('jsonwebtoken');
const connection = require('../DB/Connection');

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	// incorrect email
	if (err.message === 'incorrect email') {
		errors.email = 'That email is not registered';
	}

	// incorrect password
	if (err.message === 'incorrect password') {
		errors.password =
			'That password is incorrect';
	}

	// duplicate email error
	if (err.code === 11000) {
		errors.email =
			'that email is already registered';
		return errors;
	}

	// validation errors
	if (
		err.message.includes('user validation failed')
	) {
		// console.log(err);
		Object.values(err.errors).forEach(
			({ properties }) => {
				// console.log(val);
				// console.log(properties);
				errors[properties.path] =
					properties.message;
			}
		);
	}

	return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createClubToken = (id) => {
	return jwt.sign(
		{ id },
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: maxAge,
		}
	);
};
const createAdminToken = (email) => {
	return jwt.sign(
		{ email },
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: maxAge,
		}
	);
};

// controller actions

module.exports.login_get = (req, res) => {
	res.render('login', { msg: '' });
};

module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;
	//   if (email == process.env.ADMIN_EMAIL) {
	//     const auth = password == process.env.ADMIN_PASSWORD
	//     if (auth) {
	//       const token = createAdminToken(email);
	//       console.log("token Created")
	//       res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
	//       res.redirect("/admin")
	//     }
	//   } else {

	try {
		// const employee = await Employee.login(email, password);
		let query = 'SELECT * FROM clubs where email=? AND password=?';
		connection.query(query,[email, password], (err, result) => {
            if (result.length == 0) {
                res.render("login",{msg : "Invalid Credentials"})
            } else {
                // res.send(result)
                const token = createClubToken(result[0].id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.redirect("/club/event/add")
            }
		});
	} catch (err) {
		res.status(400).json({ errors });
	}
	// }
};

module.exports.logout_get = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.redirect('/');
};
