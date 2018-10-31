if (document.documentElement.clientWidth < 425) {
	let video = document.getElementById('video');
  let parent = document.getElementById('videoParent');
  parent.removeChild(video);
  parent.style.background = "url('./mountainthumb.jpg') no-repeat center ";
	parent.style.backgroundSize = 'cover';
  parent.style.marginBottom = '-40px';
}

$(document).on("scroll", function () {
  let pageTop = $(document).scrollTop()
  let pageBottom = pageTop + $(window).height()
  let hide = $(".hide")

  for (var i = 0; i < hide.length; i++) {
    var tag = hide[i]

    if ($(tag).position().top < pageBottom) {
      $(tag).addClass("visible")
    } else {
      $(tag).removeClass("visible")
    }
  }
})
