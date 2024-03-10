var express = require("express");
var bodyParser = require("body-parser");
const client = require("./grpcClient");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => {
	client.getAll(null, (err, data) => {
		if (!err) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
});

app.get("/get/:id", (req, res) => {
	client.get({ id: req.params.id }, (err, data) => {
		if (!err) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
});

app.post("/create", (req, res) => {
	let comment = req.body;
	client.create(comment, (err, data) => {
		if (!err) {
			res.send(data);
		} else {
			res.send(err);
		}
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Express server is running at port ${PORT}`);
});
