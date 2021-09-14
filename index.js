const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectID = require("mongodb").ObjectId;
require("dotenv").config();

const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ga4qd.mongodb.net/hospitalManagement?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//------------------------------------------------------------//
// Doctor Collection Start
client.connect((err) => {
    const doctorCollection = client
        .db("hospitalManagement")
        .collection("doctorList");

    //Add Doctor Post Route
    app.post("/addDoctor", (req, res) => {
        const doctorsData = req.body;
        doctorCollection.insertOne(doctorsData).then((result) => {
            res.send(result.insertedCount > 0);
        });
    });

    //Doctor List Get Route
    app.get("/doctorList", (req, res) => {
        doctorCollection.find({}).toArray((err, documents) => {
            res.send(documents);
        });
    });
});
// Doctor Collection end

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
});
