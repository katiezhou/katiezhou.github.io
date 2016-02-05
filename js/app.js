$(document).ready(function(){
	console.log("Hi! If you're reading this, please hire me. Thanks!")

	$(".parallax").parallax();

  var align = function() {
  	var imageHeight = $("#katie-img").height();
	  var imageCoord = $("#katie-img").position();
	  var btnCoord = $("#down-arrow-btn").position()

	  $(".links").css({
	  	height: imageHeight + "px"
	  });


	  $("#down-arrow-btn").css("bottom", -0.5*($("#down-arrow-btn").height()) + "px");

	  $("#home").css("height", imageHeight + "!important");

  }

  align();

  $(window).resize(align);

  setTimeout(function(){
 		$("#preload").fadeOut();
  }, 1500);

  $(window).scroll(function(){
		if ($(window).scrollTop() > 550) {
			$("nav").removeClass("noscroll_nav");
			$("nav").addClass("default_color");
		} else {
			$("nav").addClass("noscroll_nav");
		};

	});

});