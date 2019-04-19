const express = require('express');
const hbs = require('hbs');
const app = express()
const path = require('path');
const Twit = require('twit')
const

const T = new Twit({

});

const server = app.listen(4000, _ => {
    console.log("listening on port 4000")
})

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');


app.use(express.static('public'));

app.get("/", index)


function index (req, res){
    res.render('index', { title: 'Live Poll' });

    let stream = T.stream('statuses/filter', { track: 'mango' })

    stream.on('tweet', function (tweet) {
        console.log(tweet)
    })

}