/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function(){

  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function findTime(timePosted){
    const now = new Date().getTime();
    const differenceMs = now - timePosted;
    const oneDay = 1000*60*60*24;
    const oneHour = 1000*60*60;
    const oneMinute = 1000*60;
    let differenceDay = Math.ceil(differenceMs / oneDay);
    let timeMessage = `${differenceDay} days ago`;
    if(differenceDay <= 1){
      differenceDay = Math.ceil(differenceMs / oneHour);
      timeMessage = `${differenceDay} hours ago`;
      if (differenceDay <= 1){
        differenceDay = Math.ceil(differenceMs / oneMinute);
        timeMessage = `${differenceDay} minutes ago`;
        if (differenceDay === 1){
          timeMessage = `${differenceDay} minute ago`;
        }
      }
    }
    return timeMessage;
  }

  function createTweetElement(tweetData){
    let timeMessage = findTime(tweetData.created_at)
    let $tweetBox = `<article class='tweet-box'>
       <header>
          <img class="avatar" src="${tweetData.user['avatars']['regular']}">
          <h2>${tweetData['user']['name']}</h2>
          <span class="handler">${tweetData['user']['handle']}</span>
        </header>
        <p class="tweet">${tweetData['content']['text']}</p>
        <footer>
          <span class="days-ago">${timeMessage}</span>
          <div class="tweet-actions">
            <a class="flag"><img src="images/flag.png"></a>
            <a class="retweet"><img src="images/retweet.png"></a>
            <a class="like"><img src="images/like.png"></a>
          </div>
        </footer>
      </article>
    `;
    return $tweetBox;
  }

  function renderTweets(array){
    array.forEach(function(tweet){
      $("#tweets-container").append(createTweetElement(tweet));
    })
  }

  renderTweets(data);

})



