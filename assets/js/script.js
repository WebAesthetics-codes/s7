function drawCircle(y = 1500, r = 100) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const dynmaicHight = window.innerWidth > 786 ? 50 : 150;

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
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 3,
    smoothTouch: 0.1,
  })
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
    yPercent: -125 * images.length,
    ease: "none",
    scrollTrigger: {
      trigger: "#ourWorks",
      start: "top top",
      end: () => "+=" + totalScroll,
      pin: true,
      // markers: true,
      scrub: 0.5,
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
function canvasPing() {

  ScrollTrigger.create({
    trigger: "#myCanvas",
    start: "top top",
    end: "+=200%",
    pin: true,
    pinSpacing: false,
    // markers: true
  });
}
function whoWeAreAnim() {
  const title = document.querySelector("#whoWeTitle");
  const tittleWidth = title.offsetWidth;
  const dynmaicRadius = window.innerWidth > 786 ? window.innerWidth : window.innerHeight;
  let scrollWidth = tittleWidth - window.innerWidth;
  // console.log(scrollWidth);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#whoWeAre",
      start: "top top",
      // end: `+=${2000}%`,

      end: "+=" + scrollWidth,
      pin: true,

      // markers: true,
      scrub: 2,
      onUpdate: (data) => {
        const radius = gsap.utils.mapRange(0, 1, 100, dynmaicRadius, data.progress);

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
  tl.fromTo("#whoWeTitle", { xPercent: 0 }, { x: -scrollWidth - 100 }, "+=.5");
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
  canvasPing();
  document.querySelector("#whoWeAre") && whoWeAreAnim();
  document.querySelector("#marquee") && marqueeFooter();
  const width = window.innerWidth;
  if (width > 786) {
    document.querySelector(".videoSec") && scrollBanner();
    document.querySelector("#ourWorks") && ourWorkAnim();
    scaleWorksImages();
  }
  window.addEventListener("load", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  });
});
