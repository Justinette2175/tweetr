/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function(){
  var data = [];
  const maxChar = 140;

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
    let likes = tweetData.likes || 0;
    console.log("likes", likes);
    let $tweetBox = `<article class='tweet-box' data-id="${tweetData._id}">
       <header>
          <img class="avatar" src="${tweetData.user['avatars']['regular']}">
          <h2>${escape(tweetData['user']['name'])}</h2>
          <span class="handler">${escape(tweetData['user']['handle'])}</span>
        </header>
        <p class="tweet">${escape(tweetData['content']['text'])}</p>
        <footer>
          <span class="days-ago">${timeMessage}</span>
          <div class="tweet-actions">
            <a class="flag"><img src="images/flag.png"></a>
            <a class="retweet"><img src="images/retweet.png"></a>
            <a class="like">
              <img src="images/like.png">
              <span>${likes}</span>
            </a>

          </div>
        </footer>
      </article>
    `;
    return $tweetBox;
  }

  function renderTweets(array){
    $("#tweets-container").empty();
    array.forEach(function(tweet){
      $("#tweets-container").prepend(createTweetElement(tweet));
    })
  }

  function loadTweets(){
    $.ajax({
      url : "/tweets",
      method : 'GET',
      dataType: "json",
      success: function(data){
        console.log(data);
        renderTweets(data);
      }
    })
  }

  function isValidTweet(str){
    let flashMessage = "";
    if (str.length > maxChar){
      flashMessage = "Please keep your tweet under 140 characters."
      return flashMessage;
    }
    else if(!str){
      flashMessage = "You cannot post an empty tweet!"
      return flashMessage;
    }else{
      return true;
    }
  }

  function addLike(){

  }

  $(".new-tweet").hide();

  //load tweets on page load

  loadTweets();

  //toggle the new tweet form

  $(".compose").on('click', function(){
    $(".new-tweet").slideToggle(400, () =>{
      $(".new-tweet").is(':visible') && $('.new-tweet').find("textarea").focus();
    });
  })

  //handle new tweet post

  $(".new-tweet form").on('submit', function(e){
    e.preventDefault();
    let inputText = $(this).find("textarea").val();
    if(isValidTweet(inputText) === true){
      $.ajax({
        url : "/tweets",
        method : 'POST',
        data : $( this ).serialize(),
        success: loadTweets
      })
      $(this).find("textarea").val("");
      $(this).find(".flash-message").removeClass("visible")
    } else{
      $(this).find(".flash-message").addClass("visible").text(isValidTweet(inputText));
    }
  });

  console.log($(".like"));

  $("#tweets-container").on("click", ".like", function(e){
    let id = $(this).closest(".tweet-box").data("id");
    e.preventDefault();
    $.ajax({
      url : "/tweets/likes",
      method : 'POST',
      data : {id: id},
      success: loadTweets
    })
  })
})


