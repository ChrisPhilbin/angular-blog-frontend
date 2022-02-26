const functions = require("firebase-functions");
const app = require("express")();
const auth = require("./util/auth");

const {
  createOnePost,
  deleteOnePost,
  editOnePost,
  getAllPosts,
  getOnePost,
  getLatestPosts,
} = require("./api/posts");

app.post("/posts", auth, createOnePost);
app.get("/posts", getAllPosts);
app.get("/posts/latest", getLatestPosts);
app.get("/posts/:postId", getOnePost);
app.put("/posts/:postId", auth, editOnePost);
app.delete("/posts/:postId", auth, deleteOnePost);
exports.api = functions.https.onRequest(app);

const {
  createOneCategory,
  getAllCategories,
  getAllPostsInCategory,
} = require("./api/categories");

app.get("/categories", getAllCategories);
app.post("/categories", auth, createOneCategory);
app.get("/categories/:categoryName", getAllPostsInCategory);

const {
  createOneStaticPage,
  getOneStaticPage,
  getAllStaticPages,
} = require("./api/static");

app.get("/static/:pageName", getOneStaticPage);
app.get("/static", getAllStaticPages);
app.post("/static", auth, createOneStaticPage);

const { loginUser, getUserDetail, isUserSignedIn } = require("./api/users");

app.post("/login", loginUser);
app.get("/user", auth, getUserDetail);
app.post("/user/auth", isUserSignedIn);
