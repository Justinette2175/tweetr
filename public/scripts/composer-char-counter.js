$(document).ready(function(){

  $(".new-tweet form textarea").on('keyup', function(){
    var length = $(this).val().length;
    var remaining = 140 - length;
    $(this).closest(".new-tweet").find(".counter").text(remaining);
  })


});