$(document).ready(function(){
	console.log("Hi! If you're reading this, you're probably taking a peek at my website code. That's awesome. I do the same thing. Why not let me help build your websites and applications? I am currently looking for a developer position, so if you have any openings, please let me know! My contact info is listed on the bottom of the page. Thanks!")

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
		if ($(window).scrollTop() > 500) {
			$("nav").removeClass("noscroll-nav");
			$("navnav").addClass("scroll-nav");
		} else {
			$("nav").addClass("noscroll-nav");
			$("navnav").removeClass("scroll-nav");
		};

	});

  
  $('.tooltipped').tooltip({delay: 50});

	$('.scrollspy').scrollSpy();
 
	$(".button-collapse").sideNav();

	$(".jstext").typed({
    strings: ["Katie Zhou", "a developer", "a musician", "a thinker", "a creator"],
    contentType: "html",
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 800,
    loop: true
  });
});