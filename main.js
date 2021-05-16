const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
const Twitter = require('twitter-v2');
var _ = require('lodash');
require('dotenv').config()
const app = express();


const client = new Twitter({
    bearer_token: process.env.BEARER_TOKEN
});

async function run() {

    const { data } = await client.get('tweets/search/recent', { query: 'Delhi Oxygen Beds' });
    console.log(data);
}


axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
    country: 'india'
}).then(function(res) {
    console.log(res.data.data);
}).catch(function(error) {
    console.log(error);
});