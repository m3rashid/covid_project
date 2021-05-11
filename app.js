const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
const Twitter = require('twitter');
require('dotenv').config()
const app = express();
const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

app.set('view engine', 'ejs');
async function getdata() {
    const { data } = await client.get('tweets', { ids: '1228393702244134912' });
    console.log(data);

}

function main() {

    // Recent Tweet Search API Reference: https://bit.ly/3jqFjKF
    // const { data } = await client.get(
    //     'tweets/search/recent', {
    //         query: 'delhi oxygenbeds'
    //     }
    client.get('search/tweets', { query: 'delhi oxygen bed' }, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        } else {
            console.log(error);
        }
    });
}

client.get('search/tweets', { q: 'delhi oxygenbeds', count: 100, result_type: 'recent' }, function(error, tweets, response) {
    console.log(tweets.statuses);
});
// console.log(data);

// if (errors) {
//     console.log('Errors:', errors);
//     return;
// }

// for (const tweet of tweets) {
//     console.log(tweet);
// }
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static("public"));

app.get('/', function(req, res) {
    main();
    // getdata();
});

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("listening on port 3000");
});