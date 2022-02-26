const { db } = require("../util/admin");

exports.getAllPosts = (request, response) => {
  let max = parseInt(request.query.limit) || 10;
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .limit(max)
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          title: doc.data().title,
          category: doc.data().category,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(posts);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getOnePost = (request, response) => {
  db.doc(`/posts/${request.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json();
      }
      postData = doc.data();
      postData.postId = doc.id;
      return response.json(postData);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.createOnePost = (request, response) => {
  if (
    request.body.body.trim() === "" ||
    (request.body.title === "" && !request.body.category)
  ) {
    return response.status(400).json({ message: "Must not be empty" });
  }

  const newPost = {
    title: request.body.title,
    body: request.body.body,
    category: request.body.category,
    createdAt: new Date().toISOString(),
  };
  db.collection("posts")
    .add(newPost)
    .then((doc) => {
      const responsePost = newPost;
      responsePost.id = doc.id;
      return response.status(200).json(responsePost);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

exports.editOnePost = (request, response) => {
  console.log(request.body, "request body");
  if (request.body.body.trim() === "" || request.body.title.trim() === "") {
    return response.status(403).json({ message: "Must not be empty" });
  }
  if (request.body.postId || request.body.createdAt) {
    return response.status(403).json({ message: "Not allowed to edit" });
  }
  let document = db.collection("posts").doc(`${request.params.postId}`);
  document
    .update(request.body)
    .then(() => {
      return response.status(200).json({ post: "Updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code,
      });
    });
};

exports.deleteOnePost = (request, response) => {
  console.log(request.body, "<-- request body");
  db.collection("posts")
    .doc(request.body.postId)
    .delete()
    .then((doc) => {
      return response.status(200).json(request.body.postId);
    })
    .catch((error) => {
      response.status(500).json({ error: "something went wrong" });
      console.log(error);
    });
};

exports.getLatestPosts = (request, response) => {
  let max = parseInt(request.query.limit) || 10;
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .limit(max)
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(posts);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
