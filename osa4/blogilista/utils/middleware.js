const errorHandler = (error, request, response, next) => {
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name == 'MongoError' && error.code == 11000) {
		return response.status(400).json({ error: 'Entry alredy in database' })
	}

	next(error)
}

module.exports = {
	errorHandler
}
