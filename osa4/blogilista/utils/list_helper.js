const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const totalLikes = blogs
		.map(blog => blog.likes)
		.reduce((acc, current) => acc + current, 0)
	return totalLikes
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	} else {
		const blogWithMostLikes = blogs
			.reduce((max, current) => (current.likes > max.likes) ? current : max)

		const { title, author, likes } = blogWithMostLikes

		return { title, author, likes }
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null
	} else {
		const authors = blogs.map(blog => blog.author)
		const uniqueAuthors = [...new Set(authors)]
		const authorsWithBlogCounts = uniqueAuthors
			.map(uniqueAuthor =>
				({
					author: uniqueAuthor,
					blogs: authors.filter(author =>
						author === uniqueAuthor).length
				})
			)
		const authorWithMostBlogs = authorsWithBlogCounts
			.reduce((max, current) => (current.blogs > max.blogs) ? current : max)

		return authorWithMostBlogs
	}
}
	
const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null
	} else {
		const authorsWithLikes = blogs.map(blog => 
			({
				author: blog.author,
				likes: blog.likes,
			})
		)
		const authors = authorsWithLikes.map(item => item.author)
		const uniqueAuthors = [...new Set(authors)]
		const authorsWithLikeCounts = uniqueAuthors
			.map(author => 
				({
					author,
					likes: authorsWithLikes.map(item =>
						(author === item.author) ? item.likes : 0)
							.reduce((acc, current) => (acc + current), 0)
				})
			)

		const authorWithMostLikes = authorsWithLikeCounts
			.reduce((max, current) => (current.likes > max.likes) ? current : max)

		return authorWithMostLikes
	}
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
