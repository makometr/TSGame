import * as express from "express";
import * as https from "https";
import * as fs from "fs";
const port = 3000;
import * as bodyParser from "body-parser";
import {routes} from "./routes";

const server = express();
server.use("/", routes);

server.set("view engine", "pug");
server.set("views", `views`);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// const options = {
// 	key: fs.readFileSync('privateKey.key'),
// 	cert: fs.readFileSync('certificate.crt')
// };

// https.createServer(options, server).listen(port);

server.listen(port, (err) => {
	if (err)
		console.log("Error while starting server");
	else
		console.log(`Server started at port ${port}`);
});
