$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger)

  const vw = window.innerWidth
  const vh = window.innerHeight
  const maxSize = Math.sqrt(vw * vw + vh * vh)

  // Grow the circle and fade in as user scrolls down
  gsap.to('.circle-container', {
    width: maxSize,
    height: maxSize,
    opacity: 1,
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: '50% top',
      scrub: true
    }
  })

  // Scroll image text horizontally when circle is fully expanded
  window.addEventListener('load', () => {
    const scrollText = document.getElementById('scrollText')
    const img = scrollText.querySelector('img')

    setTimeout(() => {
      const imgWidth = img.offsetWidth
      const visibleSize = maxSize
      const scrollDistance = Math.max(0, imgWidth - visibleSize)

      gsap.to('.scroll-text', {
        x: -scrollDistance,
        scrollTrigger: {
          trigger: 'body',
          start: '50% top',
          end: 'bottom bottom',
          scrub: true
        }
      })
    }, 100)
  })

















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

// Improved responsive behavior for images
const wordImages = document.querySelectorAll(".word-img");
wordImages.forEach((img) => {
  gsap.to(img, {
    x: -(amountToScroll * 0.1),
    ease: "none",
    scrollTrigger: {
      trigger: ".needscrool",
      start: "top top",
      end: "+=" + amountToScroll,
      scrub: 1.5,
    },
  });
});

// Circle animation
const circle = document.getElementById("circle");
gsap.to(circle, {
  scrollTrigger: {
    trigger: ".circle-section",
    start: "top bottom",
    end: "center center+=10%",
    scrub: 5,
    onEnter: () => document.body.classList.add("text-black"),
    onLeaveBack: () => document.body.classList.remove("text-black"),
  },
  scale: 100,
  ease: "power2.inOut",
});

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

// Show/hide word images
ScrollTrigger.create({
  trigger: "#circle",
  start: "top bottom",
  end: "top center",
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const showText = progress > 0.85;
    gsap.to(".word-img", {
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



// Back to top button functionality
document.querySelector('.backtotop').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default anchor behavior
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling
  });
});

})
