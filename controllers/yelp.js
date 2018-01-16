const yelp = require('yelp-fusion');
const apiKey = 'RS05rCr-p-9U_e5gdM91NBUquv0yXn3jwY23PoPGaiBMhvYCTs3AoFNe7fhcBANkft0soBmARD6OrK227syz_zAzOauJ2i9ATqeGZw2CEynkX6TbUl4CMftK7DpeWnYx';
const client = yelp.client(apiKey)

const config = require('../models/config');
const jwt = require('jwt-simple')

exports.getYelp = (req, res, next) => {

	console.log("hi!")


	client.search(req.body).then(response => {
		console.log(response)
		const firstResult = response.jsonBody.businesses[0];
    	const prettyJson = JSON.stringify(firstResult, null, 4);
    	console.log(prettyJson)
    	return res.json(prettyJson);
  	}).catch(err => {
    	if (err) {
    		return res.status(400).send(err.message)
    	};
  	});
}