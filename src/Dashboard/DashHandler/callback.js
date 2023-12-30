const client = require("../../index").Client;
const passport = require("passport");

module.exports = {
  name: "/callback",
  run: (req, res, next) => {
    delete require.cache[require.resolve("../views/index.ejs")];

    if (client) {
      passport.authenticate(
        "discord",
        { failureRedirect: "/" },
        (err, user) => {
          if (err) {
            console.error(err);
            return;
          }

          if (!user) {
            return res.redirect("/");
          }

          req.logIn(user, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            // User is authenticated
            res.redirect("/");
          });
        }
      )(req, res, next);
    } else {
      console.error("Client object is null");
    }
  },
};
