const express = require("express");
const app = express();
const path = require("path");
const twitter = require('./utils/twitter')
const router = express.Router();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


router.get("/", (req, res) => {
    twitter.getUserInfo((profile, profileError) => {
        if (profileError) res.render("twitter_error", { title: "Portafolio", name: 'Error loading Twitter profile information' });

        twitter.getUserLastTweets((tweets, tweetsError) => {
            if (tweetsError) res.render("twitter_error", { title: "Portafolio", name: 'Error loading Twitter profile information' });

            res.render("index", { title: "Portafolio", name: profile.name, picture: profile.picture, tweets: tweets });
        })
        
    })
});

app.use("/", router);

app.listen(process.env.port || 3000);

console.log("Running at Port 3000");