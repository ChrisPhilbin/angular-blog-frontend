const { db } = require("../util/admin");

exports.getOneStaticPage = (request, response) => {
  db.doc(`/static/${request.params.pageName}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json();
      }
      staticPageData = doc.data();
      staticPageData.pageId = doc.id;
      return response.json(staticPageData);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getAllStaticPages = (request, response) => {
  db.collection("static")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let staticPages = [];
      data.forEach((doc) => {
        staticPages.push({
          staticId: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
        });
      });
      return response.status(200).json(staticPages);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.createOneStaticPage = (request, response) => {
  if (request.body.title.trim() === "" || request.body.body.trim() === "") {
    return response
      .status(400)
      .json({ message: "Name or body fields cannot be empty!" });
  }
  const newStaticPage = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
  };
  db.doc(`/static/${newStaticPage.title}`)
    .set(newStaticPage)
    .then((doc) => {
      const responseStaticPage = newStaticPage;
      responseStaticPage.id = doc.id;
      return response.status(200).json(responseStaticPage);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};
