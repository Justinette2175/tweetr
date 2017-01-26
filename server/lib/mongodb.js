const {MongoClient} = require("mongodb");


module.exports = MongoClient.connect;



 // console.log(`Connected to Mongodb:${MONGODB_URI}` );

 //  function getTweets(callback){
 //    db.collection("tweets").find().toArray((err, tweets) => {
 //      if (err) {
 //        return callback(err);
 //      }
 //      callback(null, tweets);
 //    })
 //  }

 //  getTweets((err, tweets) =>{
 //    if (err) throw err;

 //    console.log("logging each Tweet");
 //    for (let tweet of tweets){
 //      console.log(tweet);
 //    }
 //  })