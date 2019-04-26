const express = require('express');
const hbs = require('hbs');
const app = express()
const path = require('path');
const Sentiment = require('sentiment');
const Twit = require('twit')
const config = require('./config.js');
const socket = require('socket.io');
require('dotenv').config()
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://avengers-b3da5.firebaseio.com"
});
const db = admin.firestore();


let sentiment = new Sentiment()

var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
})

const server = app.listen(4000, _ => {
    console.log("listening on port 4000")
})
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.get("/", index)

function index (req, res){
    res.render('index', { title: 'most popular avenger' });
}

let stream = T.stream('statuses/filter', { track: '#avengersendgame', language: 'en', tweet_mode: "extended" })
 //twit stream starts here
stream.on('tweet', function (stream) {
        let tweet = {
            body: stream.text,
            id: stream.id,
            screenname: stream.user.screen_name,
            date: stream.created_at,
            sentiment: sentiment.analyze(stream.text)
        }
        stringCheck(tweet)
})

//  socket io setup
const io = socket(server)

function stringCheck(tweet){
        let txt = tweet.body.toLowerCase()

        // captain america sentiment
        if (txt.includes("captain america") && tweet.sentiment.score > 0){
            let heroRef = db.collection('heroes').doc('1puHeTa2McEWkM9VqT4l');
            let getDoc = heroRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log("added score Captain America")
                        let heroObj = doc.data()
                        let Score = heroObj.score + tweet.sentiment.score
                        let updateSingle = heroRef.update({ score: Score });
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
            io.emit("score", tweet.body)
            console.log("cap for the win")


            // iron man sentiment
        } else if (txt.includes("iron man") && tweet.sentiment.score > 0) {
            let heroRef = db.collection('heroes').doc('xrdzR3N0xo6w95Bk9Lrb');
            let getDoc = heroRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log("added score Iron Man ")
                        let heroObj = doc.data()
                        let Score = heroObj.score + tweet.sentiment.score
                        let updateSingle = heroRef.update({ score: Score });
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
            let im = "Iron man for the win"
            io.emit("score", tweet.body)
            console.log(im)
            // hulk sentiment
        } else if(txt.includes("hulk") && tweet.sentiment.score > 0){
            let heroRef = db.collection('heroes').doc('NLWEbabO5LFz7JUKVwtj');
            let getDoc = heroRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log("added score Hulk")
                        let heroObj = doc.data()
                        let Score = heroObj.score + tweet.sentiment.score
                        let updateSingle = heroRef.update({ score: Score });
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
            io.emit("score", tweet.body)
            console.log("hulk for the win")
    }
}


io.on('connection', socket => {
    console.log("User connected")


    socket.on('hover', data => {
        socket.broadcast.emit('hover', data)
    })

    socket.on('unhover', data => {
    console.log(data)
        socket.broadcast.emit('unhover', data)
    })

    socket.on('disconnect', socket => {
        console.log("user disconnected")

    })

    // socket.on('typing', data => {
    //     socket.broadcast.emit('typing', data)
    // })
})