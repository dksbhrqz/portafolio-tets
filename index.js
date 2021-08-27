const express = require("express");
const app = express();
const path = require("path");
const twitter = require('./utils/twitter')
const router = express.Router();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


router.get("/", (req, res) => {
    twitter.getUserInfo((result, error) => {
        if (error) res.render("twitter_error", { title: "Portafolio", name: 'Error loading Twitter profile information' });

        res.render("index", { title: "Portafolio", name: result.name, picture: result.picture });
        
    })
});

app.use("/", router);

app.listen(process.env.port || 3000);

console.log("Running at Port 3000");