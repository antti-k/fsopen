const usersRouter = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
	try {
		const { username, name, password } = request.body

		if (password.length < 3) {
			return response.status(400).json({ error: 'Password is too short' })
		}

		const users = await User.find({ username })

		if (users.length > 0) {
			return response.status(400).json({ error: 'Username is already in use' })
		}

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(password, saltRounds)

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
