const User = require('../models/schemas/user');
const Appointment = require('../models/schemas/restaurant')
const config = require('../models/config');
const jwt = require('jwt-simple')

// exports.createRest = (req, res, next) => {
// 	const restData = {}

// 	if(req.body.id)
// 		restData.rest_id = req.body.id

// 	restData.appointments = []
	
// 	const newRest = new Restaurant(restData)
// 	console.log("creating new restaurant!")
// 	newRest.save()
// 	.then(restaurant => {
// 		if (!restaurant) return res.status(500).send('Restaurant failed to create')
// 		return res.json(restaurant)
// 	}).catch(err => {
// 		if (err) return res.status(400).send(err.message)
// 	})
// }

exports.createApt = (req, res, next) => {
	
	const aptData = {}

	if(req.body.rest_id)
		aptData.restId = req.body.rest_id
	if (req.body.user_id)
		aptData.userId = req.body.user_id
	if (req.body.time)
		aptData.time = req.body.time

	const newApt = new Appointment(aptData)

	newApt.save()
	.then(apt => {
		if(!apt) return res.status(500).send('Appointment failed to create')
		console.log('New Apt!')
		console.log(apt)
		res.status(200).send('Yay')
		return res.json()
	}).catch(err => {
		if (err) return res.status(400).send(err.message)
	})


	/* Transfer data from req
		get user 
		search for restaurant
		If restaurant already registered add appointment to existing one 
		If not, create restaurant and add appointment */

}

exports.getApts = (req, res, next) => {

	const rest_id = req.body.id

	console.log(rest_id)
	Appointment.find({restId: rest_id}).then(apts => {
		if (!apts) return res.status(404).send('Could not find apt.')
		console.log(apts)
		return res.json(apts)
	}).catch(next)
}
