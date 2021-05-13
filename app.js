const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { STATUS_CODES } = require("http");
const chart = require("chart.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
var query = "India";
app.use('/public', express.static("public"));

app.get("/", function(req, res) {
    const url = "https://corona.lmao.ninja/v2/countries/" + query + "?strict=true&yesterday=true#";
    var cases = "";
    var recovered = "";
    var deaths = "";

    https.get(url, function(response) {
        let chunks = [];
        response.on("data", function(data) {
            chunks.push(data);
        }).on("end", function() {
            let data = Buffer.concat(chunks);
            const covidData = JSON.parse(data);
            cases = covidData.cases;
            recovered = covidData.recovered;
            deaths = covidData.deaths;
            const flag = covidData.countryInfo.flag;
            const todaycases = covidData.todayCases;
            const todayRecovered = covidData.todayRecovered;
            const todaydeaths = covidData.todayDeaths;

            res.render("index", {
                country: query,
                active: cases,
                recovered: recovered,
                dead: deaths,
                url: flag,
                todayrec: todayRecovered,
                todaycase: todaycases,
                todaydeath: todaydeaths
            });
        });
    });


});

app.get("/error", function(req, res) {
    res.render("Failure.ejs");
})

app.post("/error", function(req, res) {
    query = "India";
    res.redirect("/");
});

app.post("/", function(req, res) {
    query = req.body.country;

    const url = "https://corona.lmao.ninja/v2/countries/" + query + "?strict=true&yesterday=true#";

    https.get(url, function(response) {
        console.log(response.statusCode);
        if (response.statusCode != 200 || query === "")
            res.redirect("/error");
        else
            res.redirect("/");

    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});