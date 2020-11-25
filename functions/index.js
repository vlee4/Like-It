const functions = require('firebase-functions');
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan")
const app = express();

//Logging middleware
app.use(morgan("dev"))
//Middleware
app.use(cors({origin: true}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// const admin = require("firebase-admin");
// admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onCall((request, response) => {
//   return ("Hello from Firebase!!")
// });

app.get("/", async (req, res)=> {
  try {
    const url = `https://www.omdbapi.com/?s=${req.query.q}&apikey=${functions.config().omdb.key}`;
      let {data} = await axios.get(url);
      console.log("url", url)
      res.set("Access-Control-Allow-Origin", "*")
          .status(200)
          .send(data);
  } catch (error){
      console.log("Error from firebase function movie search", error)
      res.end()
    }
})

app.get("/:id", async(req, res)=>{
  try{
    const url = `https://www.omdbapi.com/?i=${req.query.id}&plot=full&apikey=${functions.config().omdb.key}`;
    console.log("url", url);
    let {data} = await axios.get(url);
    res.set("Access-Control-Allow-Origin", "*")
          .status(200)
          .send(data);
  } catch(error) {
    console.log("Error from firebase function details search")
  }
})

app.post("/:id", async(req, res)=>{
  try {
    const {id, title, upVotes, downVotes} = req.body;
    const db = firebase.database()
    let exists;
    await db.ref('movies').once("value")
    .then(snapshot => {
      return exists = snapshot.child(id).exists() ? "Y": "N";
    })
    if(exists==="N"){ //entry doesn't exist yet
      console.log(`entry doesn't exist for ${id}`)
      db.ref(`movies/${id}`).set({id, title, upVotes, downVotes
      })
    } else { //entry for movie already exists
      console.log(`${id} entry exists`);
      let vote = upVotes==="1"? "upVotes": "downVotes";
      db.ref(`movies/${id}/${vote}`)
        .transation(currentVote=>{
          return currentVote+1;
        })
    }
    res.set("Access-Control-Allow-Origin", "*")
          .status(200)
          .end();
  }
  catch(error){
    console.log("Error from firebase function updating rating")
  }
})

exports.movieSearch = functions.https.onRequest(app)

// exports.movieSearch = functions.https.onRequest(async(req, res)=> {
//   //req should be movie query; may or may not need to modify depending on what is being sent
//   cors(req, res, async ()=> {
//     try {
//       const url = `https://www.omdbapi.com/?s=${req.query.q}&apikey=${functions.config().omdb.key}`;
//         let {data} = await axios.get(url);
//         console.log("url", url)
//         res.set("Access-Control-Allow-Origin", "*")
//             .status(200)
//             .send(data);
//     } catch (error){
//         console.log("Error from firebase function movie search", error)
//         res.end()
//       }

//     })
// })
