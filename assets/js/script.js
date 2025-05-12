function drawCircle(y = 1500, r = 100) {
  console.log("Hellow ");
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(canvas.width / 2, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "source-over";
}

function scrollBanner() {
  gsap.set(".videoSec", { scale: 0.3 });
  gsap.to(".videoSec", {
    scale: 1,
    ease: "power3.in",
    scrollTrigger: {
      trigger: "#s7Banner",
      start: "top top",
      scrub: 0.5,
    },
  });
}

//Our Work Animation function
function ourWorkAnim() {
  const workImages = gsap.utils.toArray(".work-img");
  workImages.forEach((item, i) => {
    gsap.set(item, { scale: 0.4, yPercent: 50 * i });
  });

  const splitText = SplitText.create("#ourWorkTitle", { type: "chars" });

  const tlLetters = gsap.timeline({
    scrollTrigger: {
      trigger: "#ourWorks",
      start: "top center",
      // markers: true,
      // pin: true,
    },
  });

  tlLetters.fromTo(
    splitText.chars,
    { yPercent: 100 },
    { yPercent: 0, stagger: 0.1, duration: 2 },
  );

  const tlImgs = gsap.timeline({
    scrollTrigger: {
      trigger: "#ourWorks",
      start: "top center",
      end: "+=300%",
      markers: true,
      pin: true,
      scrub: true,
    },
  });

  tlImgs.to(workImages, { scale: 1, yPercent: -100 });
}

function whoWeAreAnim() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#whoWeAre",
      start: "top top",
      end: `+=500%`,
      pin: true,
      scrub: 0.5,
      onUpdate: (data) => {
        const radius = gsap.utils.mapRange(0, 1, 100, 1500, data.progress);

        const snapValue = gsap.utils.snap(100);

        const yValue = gsap.utils.interpolate(
          gsap.utils.mapRange(
            0,
            0.3,
            1000,
            window.innerHeight / 2,
            Math.min(data.progress, 0.3),
          ),
          window.innerHeight / 2,
          gsap.utils.clamp(0, 1, (data.progress - 0.3) / 0.2),
        );

        console.log(yValue);

        drawCircle(yValue, radius);
      },
    },
  });

  const title = document.getElementById("whoWeTitle");

  gsap.set(title, { opacity: 0 });
  tl.fromTo("#whoWeTitle", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 });
  tl.fromTo("#whoWeTitle", { xPercent: 20 }, { xPercent: -200 });
}

document.addEventListener("DOMContentLoaded", function () {
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

  drawCircle();

  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

  // ScrollSmoother.create({
  //   smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
  //   effects: true, // looks for data-speed and data-lag attributes on elements
  //   smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  // });
  //
  document.querySelector(".videoSec") && scrollBanner();
  document.querySelector("#ourWorks") && ourWorkAnim();
  document.querySelector("#whoWeAre") && whoWeAreAnim();
});
