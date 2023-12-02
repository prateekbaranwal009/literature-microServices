const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

let server = http.createServer(app);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},).then(() => {
	console.log("Connected to MongoDB");
	server.listen(3002, () => {
		console.info(`Listening to port 3002`);
	});
});