const express = require('express');
const hbs = require('hbs');
const app = express()
const path = require('path');
const Twit = require('twit')
const

const T = new Twit({
    consumer_key: 'wgjYZ99oMgaCn6wEMUziUgdi5',
    consumer_secret: 'NO4sfjohmUhUTvBYFrE1y5m56IHxY5hCXjHMgEwa7Ifjbn7amA',
    access_token: '828249843965579264 - z7xM27Jhdj47UaHzCFjfvtZaVwonYMl',
    access_token_secret: '7xuZICNjCTUEDLjaC8Ist2btw0he9dBkP01kTuTwt3Ga6'
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