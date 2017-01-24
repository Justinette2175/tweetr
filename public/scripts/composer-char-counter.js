$(document).ready(function(){
  const maxChar = 10;

  $(".new-tweet form textarea").on('keyup', function(){
    var length = $(this).val().length;
    var remaining = maxChar - length;
    var $counter = $(this).closest(".new-tweet").find(".counter");
    $counter.text(remaining);
    (length > maxChar) ? $counter.addClass("over-length") : $counter.removeClass("over-length")
  })
});