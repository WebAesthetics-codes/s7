// circle animation 
$(document).ready(function () { 
  gsap.registerPlugin(ScrollTrigger);
  
  const races = document.querySelector(".needscrool");
  const racesWidth = races.scrollWidth;
  const amountToScroll = racesWidth - window.innerWidth;
  
  // Horizontal scroll animation
  gsap.to(races, {
    x: -amountToScroll,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#whowe-wrapper",
      start: "top top",
      end: "+=" + amountToScroll,
      pin: true,
      scrub: 2,
      // markers: true,
    },
    ease: "none",
  });
  
  // Circle animation with delayed start and pop-up effect
  const circle = document.getElementById("circle");
  gsap.to(circle, {
    scrollTrigger: {
      trigger: ".circle-section",
      start: "top+=300 bottom", // Delayed start
      end: "center center+=10%",
      scrub: 5,
      onEnter: () => document.body.classList.add("text-black"),
      onLeaveBack: () => document.body.classList.remove("text-black"),
    },
    scale: 100,
    ease: "power2.inOut",
  });
  
  // Text and image pop-up effect inside the circle
  const wordGroup = document.querySelectorAll(".needscrool");
  wordGroup.forEach((group) => {
    gsap.fromTo(
      group,
      { scale: 0, opacity: 0 }, // Start small and invisible
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".circle-section",
          start: "top center", // Trigger when the circle starts scaling
          end: "top top",
          scrub: true,
        },
      }
    );
  });
  
  // Improved responsive behavior for images
  
  // Show/hide text wrapper
  ScrollTrigger.create({
    trigger: "#circle",
    start: "top bottom",
    end: "top center",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const showText = progress > 0.85;
      gsap.to("#whowe-wrapper", {
        opacity: showText ? 1 : 0,
        duration: 0.2,
        ease: "power1.out",
      });
    },
  });
  
  // Responsive recalculation
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
    const newRacesWidth = races.scrollWidth;
    const newAmountToScroll = newRacesWidth - window.innerWidth;
  
    gsap.to(races, {
      x: -newAmountToScroll,
      duration: 0.5,
      overwrite: true,
    });
  });
  
  // Initialization delay
  window.addEventListener("load", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
  });