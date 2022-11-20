// const connection = require("../DB/Connection")
// module.exports.addEvent_get = (req, res, next) => {
//     try {
// 		// const employee = await Employee.login(email, password);
// 		let query = 'SELECT * FROM clubs where id=' + req.ClubID;
// 		connection.query(query, (err, result) => {
//             if (result.length == 0) {
//                 res.render("login",{msg : "Invalid Credentials"})
//             } else {
//                 // res.send(result)
//                 const club = result[0]
//                 res.render("addEvent", {name : club.name})
//             }
// 		});
// 	} catch (err) {
// 		res.status(400).json({ errors });
// 	}
// }