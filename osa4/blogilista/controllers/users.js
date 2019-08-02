const usersRouter = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
	console.log(require.body)
	try {
		const { username, name, password } = request.body

		console.log({ password })
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(password, saltRounds)
		console.log({passwordHash})

		const user = new User({
			username,
			name,
			passwordHash
		})

		const savedUser = await user.save()

		response.json(savedUser)
	} catch (exception) {
		next(exception)
	}
})

module.exports = usersRouter
