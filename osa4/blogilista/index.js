const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')


//const mongoUrl = 'mongodb+srv://fsopen-user:fsopen@fsopen-va6ql.mongodb.net/bloglist-app?retryWrites=true'
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)
//const PORT = 3003
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
