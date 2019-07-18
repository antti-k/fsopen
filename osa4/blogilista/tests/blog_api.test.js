const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
	await Blog.deleteMany({})

	await helper.initalBlogs.forEach(async helperBlog => {
		let blogObject = new Blog(helperBlog)
		await blogObject.save()
	})
})

test('correct amount of blogs is returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

	const blogsInDb = await helper.blogsInDb()
	expect(blogsInDb.length).toBe(helper.initalBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
