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
  const url = `https://www.omdbapi.com/?s=${req}&apikey=${functions.config().omdb.key}`;
  cors(req, res, async ()=> {
    try {
      console.log("request params", req.params, "body", req.body, "query", req.body.params)
        // let {data} = await axios.get(url);
        // console.log("request", request);
        console.log("url", url)
        res.set("Access-Control-Allow-Origin", "*")
            .status(200)
            .send();
    } catch (error){
        console.log("Error from firebase function movie search", error)
        res.end()
      }

    })

  // const details = async (url) => {
  //   try{
  //     // let data = await axios.get(url);
  //     console.log("url", url)
  //     return "yes";
  //   } catch(error){
  //     console.log("Error from firebase function movie search", error);
  //     return null;
  //   }
  // }
  // return (details(url))
})
