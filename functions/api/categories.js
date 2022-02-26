const { db } = require('../util/admin');

exports.getAllCategories = (request, response) => {
	db
		.collection('categories')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let categories = [];
			data.forEach((doc) => {
				categories.push({
                    categoryId: doc.id,
                    name: doc.data().name,
					createdAt: doc.data().createdAt,
				});
			});
			return response.status(200).json(categories);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.createOneCategory = (request, response) => {
	if (request.body.name.trim() === '') {
		return response.status(400).json({ message: 'Name field cannot be empty!' });
	}
	const newCategory = {
		name: request.body.name,
		createdAt: new Date().toISOString()
	}
	db
		.collection('categories')
		.add(newCategory)
		.then((doc)=>{
			const responseCategory = newCategory;
			responseCategory.id = doc.id;
			return response.status(200).json(responseCategory);
		})
		.catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
}

exports.getAllPostsInCategory = (request, response) => {
	db
		.collection('posts')
		.where('category', '==', request.params.categoryName )
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let posts = [];
			data.forEach((doc) => {
				posts.push({
                    postId: doc.id,
					title: doc.data().title,
                    body: doc.data().body,
					category: doc.data().category,
					createdAt: doc.data().createdAt,
				});
			});
			if (posts.length === 0) {
				return response.status(404).json({'error':'no posts found'})
			} else {
				return response.status(200).json(posts)
			}
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};