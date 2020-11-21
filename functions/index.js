const functions = require('firebase-functions');
const axios = require("axios");
const cors = require("cors")({origin: true});


// const admin = require("firebase-admin");
// admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onCall((request, response) => {
//   return ("Hello from Firebase!!")
// });

exports.movieSearch = functions.https.onRequest(async(req, res)=> {
  //req should be movie query; may or may not need to modify depending on what is being sent
  cors(req, res, async ()=> {
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
})
