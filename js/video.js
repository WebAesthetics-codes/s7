$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".video-section-inner", {
    scrollTrigger: {
      trigger: ".video-section",
      start: "top+=100 top", // Start after a slight offset
      end: "bottom+=100 top", // End after the section is fully scrolled
      scrub: true,
      pin: true,
      pinspacing:true,
      markers: false,
    },
    scale: 1,
    // opacity: 1,
    width: "100vw",
    height: "100vh",
    top: "0",
    transform: "translateX(-50%)",
    ease: "power3.out",
  });
});
