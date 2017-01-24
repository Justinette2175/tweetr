$(document).ready(function(){

  $(".new-tweet form textarea").on('keyup', function(){
    var length = $(this).val().length;
    var remaining = 140 - length;
    var $counter = $(this).closest(".new-tweet").find(".counter");
    $counter.text(remaining);
    if (length > 140){
      $counter.addClass("over-length");
    }
    else if (length <= 140){
      $counter.removeClass("over-length");
    }
  })


});