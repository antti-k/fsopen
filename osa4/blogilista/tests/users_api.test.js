const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
	await User.deleteMany({})
})

test('adding a user', async () => {
	await User.deleteMany({})
	const newUser = {
		username: 'user',
		name: 'name',
		password: 'password'
	}

	await api.post('/api/users')
		.send(newUser)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const usersInDb = await helper.usersInDb()
	expect(usersInDb.length).toBe(1)
})

test('prevents adding a user with too short password', async () => {
	const newUser = {
		username: 'user',
		name: 'name',
		password: 'pa'
	}

	await api.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const usersInDb = await helper.usersInDb()
	expect(usersInDb.length).toBe(0)
})

test('prevents adding a user with too short username', async () => {
	const newUser = {
		username: 'us',
		name: 'user',
		password: 'password'
	}

	await api.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const usersInDb = await helper.usersInDb()
	expect(usersInDb.length).toBe(0)
})

test('prevents adding a user with a name that already exists', async () => {
	const newUser = {
		username: 'user',
		name: 'name',
		password: 'password'
	}

	await api.post('/api/users')
		.send(newUser)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	await api.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const usersInDb = await helper.usersInDb()
	expect(usersInDb.length).toBe(1)
})

afterAll(() => {
	mongoose.connection.close()
})

