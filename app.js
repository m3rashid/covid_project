const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
const Twitter = require('twitter-v2');
var _ = require('lodash');
require('dotenv').config()
const app = express();
const axios = require("axios");


const client = new Twitter({
    bearer_token: process.env.BEARER_TOKEN
});


app.set('view engine', 'ejs');
// async function getdata() {
//     const { data } = await client.get('tweets', { ids: '1228393702244134912' });
//     console.log(data);

// }

// function main() {
//     client.get('search/tweets', { query: 'delhi oxygen bed' }, function(error, tweets, response) {
//         if (!error) {
//             console.log(tweets);
//         } else {
//             console.log(error);
//         }
//     });
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static("public"));

app.get('/', function(req, res) {
    const url = "https://corona.lmao.ninja/v2/countries/India?strict=true&yesterday=true#";

    axios.get(url).then(function(respone) {
        console.log(respone.data);
        res.render('home', {
            info: respone.data
        });
    }).catch(function(error) {
        console.log(error);
    });


});



// app.post('/', function(req, res) {
//     let requirement = req.body.requirement;
//     let state = req.body.state;
//     res.redirect('/' + requirement + '/' + state + '/search');
// });

app.get('/:rq', function(req, res) {
    axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
        country: 'india'
    }).then(function(response) {
        console.log(response);
        res.render('search', {
            states: response.data.data,
            rq: req.params.rq
        });
    });
});

app.post('/:rq', function(req, res) {
    res.redirect("/" + req.params.rq + "/" + req.body.state + "/search");
});

app.get('/:rq/:st/search', async function(req, res) {
    let query = '#' + _.lowerCase(req.params.rq) + ' #' + _.lowerCase(req.params.st);
    await client.get('tweets/search/recent', {
        query: query,

        place: {
            fields: [
                'full_name'
            ]
        },
        tweet: {
            fields: [
                'attachments',
                'author_id',
                'text',
                'source',
                'public_metrics',
                'entities'
            ],
        },
        user: {
            fields: [
                'created_at'
            ]
        },
    }).then((tweets) => {
        console.log(tweets.data);
        if (tweets.data === undefined) {
            console.log("Not present");

            res.render('error', {
                err: "Sorry!! We couldn't find any related tweet for your query"
            })
        } else {
            res.render('show', {
                output: tweets.data,
                maxid: tweets.meta,
                rq: _.lowerCase(req.params.rq),
                st: _.lowerCase(req.params.st)

            });
        }
    });
});

app.get('/:rq/:st/:max/:id?', async function(req, res) {
    let query = '#' + _.lowerCase(req.params.rq) + ' #' + _.lowerCase(req.params.st);
    let maxid = req.params.id;
    let sinceid = req.params.id;
    console.log(maxid + " " + query);
    let traverse = req.params.max;
    if (traverse === 'next') {
        await client.get('tweets/search/recent', { query: query, next_token: maxid }).then((tweets) => {
            console.log(tweets);
            if (tweets.data === undefined) {
                console.log("Not present");

                res.render('error', {
                    err: "Sorry!! We couldn't find any related tweet for your query"
                })
            } else {
                res.render('show', {
                    output: tweets.data,
                    maxid: tweets.meta,
                    rq: _.lowerCase(req.params.rq),
                    st: _.lowerCase(req.params.st)

                });
            }
        });
    } else {
        await client.get('tweets/search/recent', { query: query, until_id: maxid }).then((tweets) => {
            console.log(tweets);
            res.render('show', {
                output: tweets.data,
                maxid: tweets.meta,
                rq: _.lowerCase(req.params.rq),
                st: _.lowerCase(req.params.st)
            });
        });
    }
})

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("listening on port 3000");
});