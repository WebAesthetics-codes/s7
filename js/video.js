$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to('.video-section-inner', {
    scrollTrigger: {
      trigger: '.video-section',
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true,
      markers: false
    },
    scale: 1,
    // opacity: 1,
    width: '100vw',
    height: '100vh',
    top: '0',
    transform: 'translateX(-50%)',
    ease: 'power3.out'
  })
})
