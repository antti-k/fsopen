const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

	try {
		const savedBlog = await blog.save()

		response.status(201).json(savedBlog)
	} catch(exception) {
		next(exception)
		response.status(400)
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
	const { id } = request.params
	try {
		const updatedPerson = await Blog.findByIdAndUpdate(id, request.body, { new: true })
		response.json(updatedPerson)
	} catch (exception) {
		next(exception)
		response.status(400)
	}
})

module.exports = blogsRouter
