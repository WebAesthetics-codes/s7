function drawCircle(y = 1500, r = 30) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const dynmaicHight = window.innerWidth > 786 ? 80 : 150;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight + dynmaicHight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(canvas.width / 2, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "source-over";
}
function smoothScrollAnim() {
  let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    smoothTouch: 0.1,
  });
  let button = document.querySelector(".footer_top_btn");

  button.addEventListener("click", (e) => {
    smoother.scrollTo(".s7-banner", true, "center center");
  });
}

function scrollBanner() {
  // Set initial state
  gsap.set(".videoSec", { scale: 0.4, y: 0 });

  // Create a scroll-triggered timeline
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#s7Banner",
      start: "top top",
      end: "bottom 70%",
      pin: true,
      pinSpacing: false,
      scrub: 1,
      // snap: 1 / 5,
      // markers: true,
    },
  });

  // Add animation to the timeline
  tl.to(".videoSec", {
    scale: 0.8,
    y: -150,
    ease: "none",
  });
  tl.to(".videoSec", {
    scale: 1,
    y: -250,
    ease: "none",
  });
  tl.to(".videoSec", {
    y: -500,
    ease: "none",
  });
}

function videoSoundBtn() {
  const video = document.getElementById("mainVideo");
  const soundButton = document.getElementById("soundButton");

  // console.log("Video element:", video); // Debugging line
  // console.log("Initial muted state:", video.muted); // Debugging line

  // Set initial button state
  updateButton();

  // Toggle mute/unmute on button click
  soundButton.addEventListener("click", function () {
    video.muted = !video.muted;
    // console.log("New muted state:", video.muted); // Debugging line
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
      soundButton.classList.add("icon-volume-mute");
      soundButton.classList.remove("icon-volume-high");
    } else {
      soundButton.classList.remove("icon-volume-mute");
      soundButton.classList.add("icon-volume-high");
    }
  }
}
function loading() {
  const el = document.querySelector("#loadingText");

  const fullText = "Oh, Hello There";
  let currentIndex = 0;

  function revealText() {
    // document.body.style.overflow = ""
    if (currentIndex <= fullText.length) {
      el.textContent = fullText.substring(0, currentIndex);
      currentIndex++;
      setTimeout(() => {
        revealText();
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
      }, 150);
    }
    if (currentIndex === fullText.length) {
      setTimeout(() => {
        document.body.style.overflow = "auto";
        gsap.to("#loadingText", {
          opacity: 0,
        });
        gsap.to("#loader", {
          opacity: 0,
          scale: 0,
          zPercent: -200,
          duration: 1,
        });
      }, 1000);
    }
  }
  revealText();
}

// function ourWorkAnim() {
//   let images = gsap.utils.toArray(".work-img");
//   let imgWrapper = document.querySelector(".our-works-img__wrapper");
//   let wrapperHight = imgWrapper.offsetHeight;
//   const imageHeight = images[1].offsetHeight;
//   // console.log(wrapperHight);
//   // let totalScroll = images.length * window.innerHeight;
//   let totalScroll = wrapperHight + (window.innerHeight - imageHeight);
//   // console.log(totalScroll);
//   gsap.to(images, {
//     // yPercent: -125 * images.length,
//     y: -totalScroll + 100,
//     ease: "none",
//     scrollTrigger: {
//       trigger: "#ourWorks",
//       start: "top top",
//       end: () => "+=" + totalScroll,
//       pin: true,
//       // markers: true,
//       scrub: 0.5,
//     },
//   });
// }
function ourWorkAnim() {
  //time line based
  let images = gsap.utils.toArray(".work-img");
  let imgWrapper = document.querySelector(".our-works-img__wrapper");
  let wrapperHeight = imgWrapper.offsetHeight;
  let heading = document.querySelector("#ourWorkTitle");
  console.log(heading);

  const imageHeight = images[1].offsetHeight;

  let totalScroll = wrapperHeight + (window.innerHeight - imageHeight);

  // Create timeline
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#ourWorks",
      start: "top top",
      end: "+=" + totalScroll,
      pin: true,
      scrub: 0.5,
      // markers: true,
    },
  });

  // Animate images vertically as the user scrolls
  tl.to(images, {
    y: -totalScroll + 100,
    ease: "none",
  });
  tl.to(
    heading,
    {
      y: "-150", // move up slightly as images start scrolling
      ease: "none",
    },
    0,
  );
}
function scaleWorksImages() {
  const images = gsap.utils.toArray(".work-img");

  images.forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 0.4 },
      {
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          // markers: true,
        },
      },
    );
  });
}
function waitForImagesThenRun(callback) {
  const wrapper = document.querySelector(".our-works-img__wrapper");
  if (!wrapper) return; // safety‑check

  const images = wrapper.querySelectorAll("img");
  let loaded = 0;

  if (images.length === 0) {
    // console.log("not img load");
    callback();
    // nothing to wait for
    return;
  }

  images.forEach((img) => {
    if (img.complete) {
      // console.log("full img load");
      if (++loaded === images.length) callback();
    } else {
      img.onload = img.onerror = () => {
        if (++loaded === images.length) callback();
      };
    }
  });
}
function workSplitTextAnim() {
  const textElement = document.querySelector(".animated-text");
  const text = textElement.textContent;
  textElement.innerHTML = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.color = "#666"; // light black
    textElement.appendChild(span);
  });

  gsap.to(".animated-text span", {
    duration: 25,
    color: "#fff",
    // stagger: 0.05, // one-by-one animation
    stagger: {
      each: 1, // still one‑by‑one
      from: "start",
      repeatDelay: 25, // 5 s pause after each character’s fade completes
    },
    scrollTrigger: {
      trigger: ".animated-text",
      start: "top center",
      end: "bottom 60%",
      // pin: true,
      scrub: 2,
      // markers: true
    },
  });
}
function canvasPing() {
  ScrollTrigger.create({
    trigger: ".who-we-are",
    start: "top top",
    end: "+=500%",
    pin: "#myCanvas",
    // pinSpacing: false,
    // markers: true
  });
}
function whoWeArePin() {
  const title = document.querySelector("#whoWeTitle");
  const tittleWidth = title.offsetWidth;
  let scrollWidth = tittleWidth - window.innerWidth;

  ScrollTrigger.create({
    trigger: "#whoWeAre",
    start: "top top",
    end: "+=" + scrollWidth * 2.5,
    pin: true,
    // pinSpacing: false,
    // markers: true
  });
}
function whoWeAreAnim() {
  const title = document.querySelector("#whoWeTitle");
  const tittleWidth = title.offsetWidth;
  const dynmaicRadius =
    window.innerWidth > 786
      ? window.innerHeight + (window.innerWidth - window.innerHeight)
      : window.innerHeight;
  let scrollWidth = tittleWidth - window.innerWidth;
  // console.log(window.innerHeight + (window.innerWidth - window.innerHeight));
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#whoWeAre",
      start: "top center",
      // end: `+=${2000}%`,

      end: "+=" + scrollWidth * 2.5,
      // pin: true,

      // markers: true,
      scrub: 2,
      onUpdate: (data) => {
        const radius = gsap.utils.mapRange(
          0,
          1,
          30,
          dynmaicRadius,
          data.progress,
        );

        const snapValue = gsap.utils.snap(100);

        const yValue = gsap.utils.interpolate(
          gsap.utils.mapRange(
            0,
            0.2,
            1000,
            window.innerHeight / 2,
            Math.min(data.progress, 0.2),
          ),
          window.innerHeight / 2,
          gsap.utils.clamp(0, 1, (data.progress - 0.3) / 0.2),
        );

        // console.log(yValue);

        drawCircle(yValue, radius);
      },
    },
  });

  gsap.set("#whoWeTitle", { opacity: 0 });
  tl.fromTo("#whoWeTitle", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 });
  tl.fromTo("#whoWeTitle", { xPercent: 0 }, { x: -scrollWidth - 100 }, 0.75);
}
function marqueeFooter() {
  const marqueeText = document.querySelector(".marquee-text");
  const container = document.querySelector(".marquee-container");

  let containerWidth = container.offsetWidth;
  let textWidth = marqueeText.offsetWidth;

  let pos = containerWidth;

  function animate() {
    pos -= 2; // speed of scrolling
    if (pos < -textWidth) {
      pos = containerWidth;
    }
    marqueeText.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
document.addEventListener("DOMContentLoaded", function () {
  loading();

  const navToggler = document.querySelector("#navToggler");

  const fetchVideo = async () => {
    try {
      const res = await fetch("./assets/video/s7_video.mp4");
      const blobData = await res.blob();
      const videoUrl = URL.createObjectURL(blobData);
      const videoEl = document.getElementById("mainVideo");
      videoEl.src = videoUrl;
      videoEl.load();
    } catch (err) {
      console.error(err);
    }
  };
  fetchVideo();

  navToggler.addEventListener("click", function () {
    const navDropdown = document.querySelector("#navDropDown");
    const navCloseBtn = document.querySelector("#navCloseBtn");

    navDropdown.classList.add("mobile__nav");

    navCloseBtn.addEventListener("click", function () {
      navDropdown.classList.remove("mobile__nav");
    });
  });

  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
  smoothScrollAnim();
  drawCircle();
  document.querySelector(".videoSec") && videoSoundBtn();
  document.querySelector("#whoWeAre") && canvasPing();
  document.querySelector("#ourWorks") && workSplitTextAnim();
  document.querySelector("#whoWeAre") && whoWeAreAnim();
  document.querySelector("#marquee") && marqueeFooter();
  // document.querySelector("#whoWeAre") && whoWeArePin();

  const width = window.innerWidth;
  if (width > 786) {
    document.querySelector(".videoSec") && scrollBanner();
    // document.querySelector("#ourWorks") && ourWorkAnim();
    document.querySelector("#ourWorks") && waitForImagesThenRun(ourWorkAnim);
    document.querySelector("#ourWorks") && scaleWorksImages();
  }

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 5000);
});
