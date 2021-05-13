const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
const _ = require('lodash');
const Twitter = require('twitter');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const cards = [
    {src: "images/covid.jpg", cardTitle: "Covid Tracker", cardText: "Click here to get information on covid death, recovery statistics", link: "/covid-tracker"},
    {src: "images/covid.jpg", cardTitle: "Card title", cardText: "Some quick example text to build on the card title and make up", link: "/random"},
    {src: "images/ambulance.jpg", cardTitle: "Ambulances", cardText: "Click here to check for available ambulances in your area", link: "/ambulances"},
    {src: "images/plasma.png", cardTitle: "Plasma Donors/Receivers", cardText: "Click here to search for plasma donors or extend help to donate", link: "/need-plasma"},
    {src: "images/bed.jpg", cardTitle: "Covid Beds", cardText: "Click here to see the available covid beds in your area", link: "/covid-beds"},
    {src: "images/cylinder.jpg", cardTitle: "Oxygen Cylinders", cardText: "Click here to see the available oxygen cylinders in your area", link: "/oxygen-cylinders"}
];

// async function getdata() {
//     const { data } = await client.get('tweets', { ids: '1228393702244134912' });
//     console.log(data);

// }

// function main() {

//     // Recent Tweet Search API Reference: https://bit.ly/3jqFjKF
//     // const { data } = await client.get(
//     //     'tweets/search/recent', {
//     //         query: 'delhi oxygenbeds'
//     //     }
//     client.get('search/tweets', { query: 'delhi oxygen bed' }, function(error, tweets, response) {
//         if (!error) {
//             console.log(tweets);
//         } else {
//             console.log(error);
//         }
//     });
// }

// client.get('search/tweets', { q: 'delhi oxygenbeds', count: 100, result_type: 'recent' }, function(error, tweets, response) {
//     console.log(tweets.statuses);
// });
// console.log(data);

// if (errors) {
//     console.log('Errors:', errors);
//     return;
// }

// for (const tweet of tweets) {
//     console.log(tweet);
// }

// app.get('/', function(req, res) {
//     // main();
//     // getdata();
// });

app.get('/', function(req, res){
    res.render('home', {
        cards: cards
    })
});
app.get('/:initial', function(req, res){
    let url = _.lowerCase(req.params.initial);
    if(url == "home"){
        res.render('home', {
            cards: cards
        });
    }
    else if(url == "about"){
        res.render('about', {
            title: "About Us",
            bigText: "This is about us page",
            smallText: "Feel free to move around",
            url: "/contact"
        });
    }
    else if(url == "contact us"){
        res.render('about', {
            title: "Contact Us",
            bigText: "This is contact us page",
            smallText: "Feel free to move around",
            url: "/about"
        });
    }
    else if(url == "covid tracker"){
        res.render('covid-tracker', {
            
        });
    }
    else if(url == "ambulances"){
        res.render('data', {
            
        });
    }
    else if(url == "covid beds"){
        res.render('data', {
            
        });
    }
    else if(url == "oxygen cylinders"){
        res.render('data', {
            
        });
    }
    else if(url == "need plasma"){
        res.render('data', {
            
        });
    }
    else{
        res.render('about', {
            title: "404 Page Not Found",
            bigText: "The page you are looking for is not fouund",
            smallText: "Try a different link",
            url: "/"
        });
    }
    
})

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("listening on port 3000");
});