function drawCircle(y = 1500, r = 100) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight + 20;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(canvas.width / 2, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "source-over";
}

function scrollBanner() {
  gsap.set(".videoSec", { scale: 0.3, y: 0 });
  gsap.to(".videoSec", {
    scale: 1,
    y: -500,
    ease: "none",
    scrollTrigger: {
      trigger: "#s7Banner",
      start: "top top",
      end: "bottom center",
      pinSpacing: false,
      pin: true,
      scrub: .25,
      // snap: 1 / 5,
      // markers: true,
    },
  });
}
function loading() {
  const el = document.querySelector("#loadingText");

  const fullText = "Oh, Hello There";
  let currentIndex = 0;

  function revealText() {
    if (currentIndex <= fullText.length) {
      el.textContent = fullText.substring(0, currentIndex);
      currentIndex++;
      setTimeout(revealText, 150);
    }
    if (currentIndex === fullText.length) {
      setTimeout(() => {
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

function ourWorkAnim() {
  let images = gsap.utils.toArray(".work-img");
  // const imageHeight = images[1].offsetHeight;
  let totalScroll = images.length * window.innerHeight;
  gsap.to(images, {
    yPercent: -120 * images.length,
    ease: "none",
    scrollTrigger: {
      trigger: "#ourWorks",
      start: "top top",
      end: () => "+=" + totalScroll,
      pin: true,
      // markers: true,
      scrub: true,
    },
  });
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

function whoWeAreAnim() {
  const title = document.querySelector("#whoWeTitle");
  const tittleWidth = title.offsetWidth;
  let scrollWidth = tittleWidth - window.innerWidth;
  console.log(scrollWidth);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#whoWeAre",
      start: "top top",
      // end: `+=${2000}%`,

      end: "+=" + scrollWidth,
      pin: true,

      // markers: true,
      scrub: true,
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

        // console.log(yValue);

        drawCircle(yValue, radius);
      },
    },
  });

  gsap.set("#whoWeTitle", { opacity: 0 });
  tl.fromTo("#whoWeTitle", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 });
  tl.fromTo("#whoWeTitle", { xPercent: 0 }, { x: -scrollWidth - 200 });
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

  drawCircle();

  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

  // ScrollSmoother.create({
  //   smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
  //   effects: true, // looks for data-speed and data-lag attributes on elements
  //   smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  // });
  //


  document.querySelector("#whoWeAre") && whoWeAreAnim();
  const width = window.innerWidth;
  if (width > 786) {
    document.querySelector(".videoSec") && scrollBanner();
    document.querySelector("#ourWorks") && ourWorkAnim();
    scaleWorksImages();
  }
});
