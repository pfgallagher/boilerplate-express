const express = require("express");
const app = express();
const path = require("path");

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

// --> 11)  Mount the body-parser middleware  here

console.log("Hello World");

app.use(express.static(path.join(__dirname, "./views")));
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res, next) => {
	res.send("Hello Express");
});

app.get("/json", (req, res, next) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		res.json({ message: "HELLO JSON" });
	} else {
		res.json({ message: "Hello json" });
	}
});

app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res, next) => {
		res.json({ time: req.time });
	},
);

app.get("/:word/echo", (req, res, next) => {
	res.json({
		echo: req.params.word,
	});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
