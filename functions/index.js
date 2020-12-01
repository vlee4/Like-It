const functions = require('firebase-functions');
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan")
const app = express();

const admin = require("firebase-admin");
admin.initializeApp();

//Logging middleware
app.use(morgan("dev"))
//Middleware
app.use(cors({origin: true, allowedHeaders: ["content-type", "request-headers", "request-method" ]}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", async (req, res)=> {
  try {
    const url = (req.query.page)?(`https://www.omdbapi.com/?s=${req.query.q}&page=${req.query.page}&apikey=${functions.config().omdb.key}`) : (`https://www.omdbapi.com/?s=${req.query.q}&apikey=${functions.config().omdb.key}`);
      let {data} = await axios.get(url);
      res.set("Access-Control-Allow-Origin", "*")
          .status(200)
          .send(data);
  } catch (error){
      console.log("Error from firebase function movie search", error)
    }
})

app.get("/:id", async(req, res)=>{
  try{
    const url = `https://www.omdbapi.com/?i=${req.query.id}&plot=full&apikey=${functions.config().omdb.key}`;

    let {data} = await axios.get(url);
    res.set("Access-Control-Allow-Origin", "*")
          .status(200)
          .send(data);
  } catch(error) {
    console.log("Error from firebase function details search", error)
  }
})

app.post("/:id", async(req, res)=>{
  try {
    const {id, title, upVotes, downVotes} = req.body;
    const db = admin.database()
    let exists;

    await db.ref('movies').once("value")
    .then(snapshot => {
      exists = snapshot.child(id).exists() ? "Y": "N";
      return exists;
    })

    if(exists==="N"){
      //entry doesn't exist yet
      db.ref(`movies/${id}`).set({id, title, upVotes, downVotes})
    } else {
      //entry for movie already exists
      //if both up & down have values
      if((upVotes!==0)&&(downVotes!==0)){
        db.ref(`movies/${id}/upVotes`)
        .transaction(currentVote=>{
          return currentVote+upVotes;
        })
        db.ref(`movies/${id}/downVotes`).transaction(currentVote => {
          return currentVote+downVotes;
        })
      }
      else {
        let vote = upVotes!==0? "upVotes": "downVotes";
        let voteVal = upVotes!==0? upVotes: downVotes;
        db.ref(`movies/${id}/${vote}`)
          .transaction(currentVote=>{
            return currentVote+voteVal;
          })
      }
    }
    res.set("Access-Control-Allow-Origin", "*")
          .status(200)
          .end();
  }
  catch(error){
    console.log("Error from firebase function updating rating", error)
  }
})

exports.movieSearch = functions.https.onRequest(app)
