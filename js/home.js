$(document).ready(function () {
  loading();

  setTimeout(() => {
    $("#loader").hide();
    $("#view").show();
    $("#navbar").show();
  }, 5000);

  function loading() {
    $("#view").hide();
    $("#navbar").hide();
    var fullText = "Oh, Hello There";
    var currentIndex = 0;
    function revealText() {
      if (currentIndex <= fullText.length) {
        $("#loadingText").text(fullText.substring(0, currentIndex));
        currentIndex++;
        setTimeout(revealText, 150);
      }
    }
    revealText();
  }

  $("#sub-menu").click(function () {
    $("#menu-scroll-view").show();
    $("body").css("overflow", "hidden");
  });

  $(".menu-scroll-view-inner").click(function () {
    $("#menu-scroll-view").hide();
    $("body").css("overflow", "auto");
  });

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $("#sub-menu").addClass("show");
      $("#navbarNav").addClass("hidden");
    } else {
      $("#sub-menu").removeClass("show");
      $("#navbarNav").removeClass("hidden");
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() >= 1400) {
      console.log("bottom");
      $("#banner-section").css({ background: "#000" });
    } else {
      console.log("top");
      $("#banner-section").css({ background: "" });
    }
  });
});

// Sound Button

// Wait for everything to load
window.onload = function () {
  const video = document.getElementById("myVideo");
  const soundButton = document.getElementById("soundButton");

  console.log("Video element:", video); // Debugging line
  console.log("Initial muted state:", video.muted); // Debugging line

  // Set initial button state
  updateButton();

  // Toggle mute/unmute on button click
  soundButton.addEventListener("click", function () {
    video.muted = !video.muted;
    console.log("New muted state:", video.muted); // Debugging line
    updateButton();

    // Try to play if unmuting (required by some browsers)
    if (!video.muted) {
      video.play().catch((error) => {
        console.log("Play failed:", error);
        // Show message to user if needed
        alert("Please interact with the page first to enable sound");
      });
    }
  });

  function updateButton() {
    if (video.muted) {
      soundButton.innerHTML =
        '<svg id="Layer_1" enable-background="new 0 0 512 512" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m470.014 256.001 37.593-37.594c5.858-5.857 5.858-15.355 0-21.213-5.857-5.857-15.355-5.857-21.213 0l-37.593 37.594-37.594-37.594c-5.857-5.858-15.354-5.858-21.213 0-5.857 5.857-5.857 15.355 0 21.213l37.594 37.594-37.594 37.594c-5.857 5.857-5.857 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394l37.594-37.594 37.593 37.594c2.929 2.93 6.767 4.394 10.606 4.394 3.838 0 7.678-1.465 10.606-4.394 5.858-5.857 5.858-15.355 0-21.213z"/><path d="m319.027 16.548c-8 0-16.221 2.775-24.434 8.251l-136.061 90.706v280.99l136.062 90.707c8.212 5.474 16.432 8.249 24.432 8.25h.003c9.882 0 18.574-4.299 24.478-12.104 5.12-6.771 7.827-15.939 7.827-26.513v-401.669c0-26.678-16.227-38.618-32.307-38.618z"/><path d="m0 183.701v144.6c0 30.419 24.748 55.166 55.167 55.166h73.366v-254.934h-73.366c-30.419 0-55.167 24.748-55.167 55.168z"/></g></svg>';
    } else {
      soundButton.innerHTML =
        '<svg id="Layer_1" enable-background="new 0 0 512 512" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m437.02 74.979c-5.857-5.857-15.355-5.857-21.213 0s-5.857 15.355 0 21.213c88.117 88.117 88.117 231.496 0 319.615-5.857 5.857-5.857 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394c48.352-48.353 74.981-112.641 74.981-181.022s-26.629-132.668-74.98-181.019z"/><path d="m391.574 120.422c-5.858-5.857-15.355-5.857-21.213 0-5.857 5.858-5.857 15.355 0 21.213 30.549 30.548 47.373 71.163 47.373 114.364 0 43.2-16.824 83.815-47.373 114.362-5.857 5.857-5.857 15.354 0 21.213 2.929 2.93 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394c36.215-36.213 56.16-84.361 56.16-135.575.001-51.215-19.944-99.363-56.159-135.577z"/><path d="m0 183.698v144.602c0 30.419 24.748 55.166 55.166 55.166h41.233v-254.934h-41.233c-30.418 0-55.166 24.747-55.166 55.166z"/><path d="m313.969 19.937c-11.271-6.237-25.584-4.905-39.271 3.663l-148.298 92.845v279.109l148.298 92.845c7.996 5.006 16.206 7.543 23.898 7.543 5.475 0 10.688-1.285 15.373-3.88 11.27-6.241 17.733-19.081 17.733-35.229v-401.668c0-16.147-6.464-28.987-17.733-35.228z"/></g></svg>';
    }
  }
};
