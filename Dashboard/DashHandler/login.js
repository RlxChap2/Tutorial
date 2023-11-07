const client = require("../../index").Client;

module.exports = {
  name: "/login",
  async run(req, res) {
    delete require.cache[require.resolve("../views/index.ejs")];

    res.redirect("/callback");

    res.render("./Dashboard/views/index.ejs");
  },
};
