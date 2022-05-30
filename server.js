const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for helping read request object

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

    app.use(bodyParser.urlencoded({ extended: true })); // tells bodyParser to use urlencoded- this way we can extract data from the request (req.body)

    app.get("/", (req, res) => {
      // res.send("Hello World!!!!!!");
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch(console.error);

// app.get("/", (req, res) => {
//   console.log("Hello from server.js!");
// });

// const express = require('express')
// const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient
// const app = express()

// // ========================
// // Link to Database
// // ========================
// // Updates environment variables
// // @see https://zellwk.com/blog/environment-variables/
// require('./dotenv')

// // Replace process.env.DB_URL with your actual connection string
// const connectionString = process.env.DB_URL

// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('star-wars-quotes')
//     const quotesCollection = db.collection('quotes')

//     // ========================
//     // Middlewares
//     // ========================
//     app.set('view engine', 'ejs')
//     app.use(bodyParser.urlencoded({ extended: true }))
//     app.use(bodyParser.json())
//     app.use(express.static('public'))

//     // ========================
//     // Routes
//     // ========================
//     app.get('/', (req, res) => {
//       db.collection('quotes').find().toArray()
//         .then(quotes => {
//           res.render('index.ejs', { quotes: quotes })
//         })
//         .catch(/* ... */)
//     })

//     app.post('/quotes', (req, res) => {
//       quotesCollection.insertOne(req.body)
//         .then(result => {
//           res.redirect('/')
//         })
//         .catch(error => console.error(error))
//     })

//     app.put('/quotes', (req, res) => {
//       quotesCollection.findOneAndUpdate(
//         { name: 'Yoda' },
//         {
//           $set: {
//             name: req.body.name,
//             quote: req.body.quote
//           }
//         },
//         {
//           upsert: true
//         }
//       )
//         .then(result => res.json('Success'))
//         .catch(error => console.error(error))
//     })

//     app.delete('/quotes', (req, res) => {
//       quotesCollection.deleteOne(
//         { name: req.body.name }
//       )
//         .then(result => {
//           if (result.deletedCount === 0) {
//             return res.json('No quote to delete')
//           }
//           res.json('Deleted Darth Vadar\'s quote')
//         })
//         .catch(error => console.error(error))
//     })

//     // ========================
//     // Listen
//     // ========================
//     const isProduction = process.env.NODE_ENV === 'production'
//     const port = isProduction ? 7500 : 3000
//     app.listen(port, function () {
//       console.log(`listening on ${port}`)
//     })
//   })
//   .catch(console.error)
// console.log("hi");
