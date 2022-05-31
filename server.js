const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for helping read request object
var ObjectId = require("mongodb").ObjectID; // to gain access to ObjectID for delete query

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

    app.listen(3000, function () {
      console.log("Listening on 3000 🔔");
    });

    // MIDDLEWARE
    app.use(bodyParser.urlencoded({ extended: true })); // tells bodyParser to use urlencoded- this way we can extract data from the request (req.body)
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(bodyParser.json());

    app.put("/quotes", (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: "Yoda" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          // console.log(result);
          res.json("Success");
        })
        .catch((error) => console.error(error));
    });

    app.get("/", (req, res) => {
      const cursor = db
        .collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          // results is the array of objects in the collection
          res.render("index.ejs", { quotes: results }); // passing 'quotes' variable to ejs template for us to use
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          // console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ _id: ObjectId(req.body.id) })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          console.log(result);
          return res.json(`Quote has been deleted!`);
        })
        .catch((error) => console.error(error));
      console.log(typeof req.body.id === "string");
    });
  })
  .catch(console.error);
