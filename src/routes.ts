import * as express from "express";
import * as fs from "fs";
import * as bodyParser from 'body-parser';

const router = express.Router();
router.use(express.static('public'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/getpicture', (req, res, next) => {
// 	// http://127.0.0.1:3000/getbook?id=1
// 	console.log('\nUser requested picture with id: ', req.query.id);
// 	let requestedPictureID = req.query.id; 
// 	let picture = serverGallary.getPicture(requestedPictureID);
// 	if (picture == null){
// 		console.log("Error: No picture with such id!");

// });

router.get('*', (req, res, next) => {
	console.log(req.path);
	res.status(404);
	res.render("menu", {
		title : "Start Game!",
	});
	// res.end("<h1>Page not found</h1>");
	// res.send("./index.html");
	next();
});

export {router as routes}