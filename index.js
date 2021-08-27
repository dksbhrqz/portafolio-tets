const express = require("express");
const app = express();
const path = require("path");
const twitter = require('./utils/twitter')
const db = require('./utils/db')
const bodyParser = require('body-parser');
const router = express.Router();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    db.getInfo((workExperience) => {
        twitter.getUserInfo((profile, profileError) => {
            if (profileError) res.render("error", { title: "Portafolio", name: 'Error loading Twitter profile information' });
    
            twitter.getUserLastTweets((tweets, tweetsError) => {
                if (tweetsError) res.render("error", { title: "Portafolio", name: 'Error loading Timeline information' });
                const indexInfo = { 
                    title: "Portafolio",
                    name: profile.name,
                    picture: profile.picture,
                    tweets: tweets,
                    workExperience: workExperience.information
                }
                res.render("index", indexInfo);
            })
            
        })
    })
});

router.get("/workExperience", (req, res) => {
    db.getInfo((workExperience) => {
        res.json(workExperience);
    })
});

router.put("/workExperience", (req, res) => {
    const newInfo = {
        information: ''
    }
    if(!req.body.information) return res.status(400).send({message: 'information field is required'})
    newInfo.information = req.body.information
    db.updateInfo(newInfo, (workExperience, error) => {
        if (error) return res.status(500).send(error)
        res.json(workExperience);
    })
});

app.use("/", router);

app.listen(process.env.port || 3000);

console.log("Running at Port 3000");