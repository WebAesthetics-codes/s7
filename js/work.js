$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger)

  const sections = gsap.utils.toArray('.scroll-item')
  const title = document.querySelector('.hdr')

  ScrollTrigger.create({
    trigger: sections[0],
    start: 'top center',
    end: 'bottom top',
    endTrigger: sections[sections.length - 1],
    pin: title,
    pinSpacing: false,
    id: 'H2'
  })

  gsap.to('.items-section-inner', {
    scrollTrigger: {
      trigger: '.items-section-view',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      pin: true,
      markers: false
    },
    scale: 1,
    opacity: 1,
    width: '75vw',
    height: '100vh',
    top: '0',
    transform: 'translateX(-100%)',
    ease: 'power3.out'
  })

  gsap.to('.items-section-inner-second', {
    scrollTrigger: {
      trigger: '.items-section-view-second',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      pin: true,
      markers: false
    },
    scale: 1,
    opacity: 1,
    width: '75vw',
    height: '100vh',
    top: '0',
    transform: 'translateX(-100%)',
    ease: 'power3.out'
  })

  gsap.to('.items-section-inner-third', {
    scrollTrigger: {
      trigger: '.items-section-view-third',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      pin: true,
      markers: false
    },
    scale: 1,
    opacity: 1,
    width: '75vw',
    height: '100vh',
    top: '0',
    transform: 'translateX(-100%)',
    ease: 'power3.out'
  })

  gsap.to('.items-section-inner-four', {
    scrollTrigger: {
      trigger: '.items-section-view-four',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      pin: true,
      markers: false
    },
    scale: 1,
    opacity: 1,
    width: '75vw',
    height: '100vh',
    top: '0',
    transform: 'translateX(-50%)',
    ease: 'power3.out'
  })
})
