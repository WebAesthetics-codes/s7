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

function ourWorkAnim() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#ourWorks",
      start: "top center",
      end: "bottom bottom",
      markers: true,
      onEnter: () => {
        // const el = document.querySelector("#ourWorks");
        // el.style.position = "sticky";
        // el.style.top = 0;
      },
    },
  });

  const splitText = SplitText.create("#ourWorkTitle", { type: "chars" });
  console.log(splitText);
  tl.fromTo(splitText.chars, { yPercent: 100 }, { yPercent: 0, stagger: 0.1 });
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
      console.log("heelo");
      navDropdown.classList.remove("mobile__nav");
    });
  });

  //Banner Scroll
  gsap.registerPlugin(ScrollTrigger, SplitText);
  document.querySelector(".videoSec") && scrollBanner();
  document.querySelector("#ourWorks") && ourWorkAnim();
});
