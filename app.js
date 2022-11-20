const express = require("express")
const cookieParser = require('cookie-parser');

const con = require("./DB/Connection");
const authRoute = require("./Route/Auth.route")
const clubRoute = require("./Route/Club.route")
const publicRoute = require("./Route/Public.route")

const app = express()
const port  = process.env.PORT || 3000

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(express.json())


app.use("", publicRoute)
app.use("", authRoute)
app.use("/club/event", clubRoute)



// app.get('/', (req, res) => {
//     res.render("index")
// })


app.listen(port, () => console.log(`Listening on port ${port}`))
