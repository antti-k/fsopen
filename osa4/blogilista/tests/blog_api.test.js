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

test('blog object has id field', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
    .expect('Content-Type', /application\/json/)

	const blogsInDb = await helper.blogsInDb()
	expect(blogsInDb[0].id).toBeDefined()
})

test('adding a blog', async () => {
	const newBlog = {
		title: 'You might not need redux',
		author: 'Dan Abramov',
		url: 'https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367',
		likes: 3,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
    .expect('Content-Type', /application\/json/)

	const blogsInDb = await helper.blogsInDb()
	expect(blogsInDb.length).toBe(helper.initalBlogs.length + 1)

	const titles = blogsInDb.map(blog => blog.title)
	expect(titles).toContain(newBlog.title)
})

test('adding a blog without likes', async () => {
	const newBlog = {
		title: 'You might not need redux',
		author: 'Dan Abramov',
		url: 'https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367',
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
    .expect('Content-Type', /application\/json/)

	const blogsInDb = await helper.blogsInDb()
	expect(blogsInDb.length).toBe(helper.initalBlogs.length + 1)

	const addedBlog = blogsInDb.find(blog => blog.title === newBlog.title)

	expect(addedBlog.likes).toBe(0)
})

test('adding a blog without title and url', async  () => {
	const newBlog = {
		author: 'Me'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
})

test('deleting a blog', async () => {
  await api
    .get('/api/blogs')

	const blogsInDb = await helper.blogsInDb()
	const { id } = blogsInDb[0]
	await api
		.delete(`/api/blogs/${id}`)
		.expect(204)

	const blogsInDbAfterDelete = await helper.blogsInDb()
	expect(blogsInDbAfterDelete.length).toBe(helper.initalBlogs.length - 1)
})

test('adding and updating a blog', async () => {
	const originalBlog = {
		title: 'You might not need redax',
		author: 'Dan Abremov',
		url: 'http://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367',
		likes: 2,
	}

	await api
		.post('/api/blogs')
		.send(originalBlog)
		.expect(201)
    .expect('Content-Type', /application\/json/)

	const blogsInDb = await helper.blogsInDb()
	expect(blogsInDb.length).toBe(helper.initalBlogs.length + 1)

	const addedBlog = blogsInDb.find(blog => blog.title === originalBlog.title)

	expect(addedBlog.title).toBe(originalBlog.title)
	expect(addedBlog.author).toBe(originalBlog.author)
	expect(addedBlog.url).toBe(originalBlog.url)
	expect(addedBlog.likes).toBe(originalBlog.likes)

	const { id } = addedBlog 

	const newBlog = {
		title: 'You might not need redux',
		author: 'Dan Abramov',
		url: 'https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367',
		likes: 10,
	}

	await api
		.put(`/api/blogs/${id}`)
		.send(newBlog)
		.expect(200)
    .expect('Content-Type', /application\/json/)

	const updatedBlogsInDb = await helper.blogsInDb()
	expect(updatedBlogsInDb.length).toBe(helper.initalBlogs.length + 1)
	const updatedBlog = updatedBlogsInDb.find(blog => blog.title === newBlog.title)

	expect(updatedBlog.title).toBe(newBlog.title)
	expect(updatedBlog.author).toBe(newBlog.author)
	expect(updatedBlog.url).toBe(newBlog.url)
	expect(updatedBlog.likes).toBe(newBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
