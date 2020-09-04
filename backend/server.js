const express = require("express");
const server = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
require("dotenv").config();

//connect app to database
MongoClient.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("goosehub");
    console.log("Connected to DB!");
    const cardCollection = db.collection("cards");
    console.log("Collection created!");

    //EJS
    // server.set("view engine", "ejs");

    //middlewares
    server.use(cors());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.post("/guidepage", (req, res) => {
      console.log(req.body);
      cardCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.send({ status: "success" });
        })
        .catch((error) => {
          console.error(error);
          res.send({ status: "failure" });
        });
    });

    //Get request to display card
    server.get("/guidepage", (req, res) => {
      db.collection("cards")
        .find()
        .toArray()
        .then((results) => {
          res.json(results);
        })
        .catch((error) => console.error(error));
      res.render("index.ejs", { cardCollection: results });
    });

    //Get request to load guide
    server.get("/loadguide", (req, res) => {
      db.collection("cards")
        .find()
        .toArray()
        .then((results) => {
          res.json(results);
        })
        .catch((error) => console.error(error));
      res.render("index.ejs", { cardCollection: results });
    });

    // PUT request to update guide
    // ***Needs work
    server.put("/cards", (req, res) => {
      cardCollection
        .findOneAndUpdate(querry, update, options)
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.error(error));
    });

    //DELETE operation
    /*const deleteButton = document.querySelector("#delete-button")
    deleteButton.addEventListener("click", => {
      fetch("/cards", {
        method: "delete",
      
      })
    })*/
    server.delete("cards", (req, res) => {
      //handle delete event
      cardCollection
        .remove(querry, options)
        .then((result) => {
          res.json("Deleted card");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch(console.error);

//listen to server
let PORT = process.env.PORT ? process.env.PORT : 4000;
server.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
