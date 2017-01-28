"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db, ObjectID) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    updateLike: function(id, callback){
      let obj_id = new ObjectID(id);
      db.collection("tweets").find({"_id" : obj_id}).toArray((err, tweets)=>{
        if (err) {
          return callback(err);
        }
        let likes = Number(tweets[0].likes);
        likes += 1;
        db.collection("tweets").update({"_id" : obj_id }, {$set:{"likes" : likes}}, callback);
      })

      //console.log(db.collection("tweets").find().toArray());
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      })
    }
  };
}
