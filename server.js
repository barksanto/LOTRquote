const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for helping read request object
var ObjectId = require("mongodb").ObjectID; // to gain access to ObjectID for delete query for DB
const https = require("https");
const axios = require("axios");

// MongoDB Database
const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://barksanto:xXeS3CKKjnCp0Rw0@cluster0.b6knnb1.mongodb.net/?retryWrites=true&w=majority";

// connection string contains username and password for access to db
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("STARQUOTE");
    const quotesCollection = db.collection("quotes");

    app.listen(process.env.PORT || 3000, function () {
      console.log("Listening on 3000 🔔");
    });

    // Express specific Middleware
    app.use(bodyParser.urlencoded({ extended: true })); // tells bodyParser to use urlencoded- this way we can extract data from the request (req.body)
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(bodyParser.json());

    // Get existing quotes from DB
    app.get("/", (req, res) => {
      const cursor = db
        .collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          // results is the array of objects in the collection
          console.log(results);
          res.render("index.ejs", { quotes: results }); // passing 'quotes' variable to ejs template for us to use
        })
        .catch((error) => console.error(error));
    });

    // Update existing quote
    app.put("/quotes", (req, res) => {
      const { id, quote } = req.body;
      quotesCollection
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          {
            $set: {
              quote: quote,
            },
          },
          {
            upsert: false,
          }
        )
        .then((result) => {
          // res.json("Success");
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    // Add  random quote
    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    // Delete one quote
    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ _id: ObjectId(req.body.id) })
        .then((result) => {
          if (result.deletedCount === 0) {
            console.log("Quote deleted");
            return res.json("No quote to delete");
          }
          // console.log(result);
          return res.json(`Quote has been deleted!`);
        })
        .catch((error) => console.error(error));
    });

    app.post("/clicked", (req, res) => {
      axios
        .get("https://lotr-random-quote-api.herokuapp.com/api/quote")
        .then((res) => {
          const quoteData = res.data;
          console.log(res.data);
          const newQuote = {
            name: quoteData.author,
            quote: quoteData.quote,
            image: quoteData.image,
          };

          quotesCollection
            .insertOne(newQuote)
            .catch((error) => console.error(error));
        })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log("Error: ", err.message);
        });
    });
  })
  .catch(console.error);
