const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));

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

app.get("/name", (req, res, next) => {
	res.json({
		name: `${req.query.first} ${req.query.last}`,
	});
});

app.post("/name", (req, res, next) => {
	res.json({
		name: `${req.body.first} ${req.body.last}`,
	});
});

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
