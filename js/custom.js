$(document).ready(function () {
  loading()

  setTimeout(() => {
    $('#loader').hide()
  }, 3000)

  function loading () {
    var fullText = 'Oh, Hello There'
    var currentIndex = 0
    function revealText () {
      if (currentIndex <= fullText.length) {
        $('#loadingText').text(fullText.substring(0, currentIndex))
        currentIndex++
        setTimeout(revealText, 150)
      }
    }
    revealText()
  }

  $('#sub-menu').click(function () {
    $('#menu-scroll-view').show()
    $('body').css('overflow', 'hidden')
  })

  $('.menu-scroll-view-inner').click(function () {
    $('#menu-scroll-view').hide()
    $('body').css('overflow', 'auto')
  })

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('#sub-menu').addClass('show')
      $('#navbarNav').addClass('hidden')
    } else {
      $('#sub-menu').removeClass('show')
      $('#navbarNav').removeClass('hidden')
    }
  })

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
    opacity: 1,
    width: '100vw',
    height: '100vh',
    top: '0',
    transform: 'translateX(-50%)',
    ease: 'power3.out'
  })

  gsap.to('.center-content-section h2', {
    scrollTrigger: {
      trigger: '.center-content-section',
      start: 'top 80%',
      end: 'top 79%',
      toggleActions: 'play none none reverse'
    },
    rotationX: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power4.out'
  })

  gsap.to('.items-section-inner', {
    scrollTrigger: {
      trigger: '.items-section-view',
      start: 'top top',
      end: '+=100%',
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

  gsap.to('.items-section-inner-second', {
    scrollTrigger: {
      trigger: '.items-section-view-second',
      start: 'top top',
      end: '+=100%',
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

  gsap.to('.items-section-inner-third', {
    scrollTrigger: {
      trigger: '.items-section-view-third',
      start: 'top top',
      end: '+=100%',
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

  gsap.to('.items-section-inner-four', {
    scrollTrigger: {
      trigger: '.items-section-view-four',
      start: 'top top',
      end: '+=100%',
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

  gsap.to('.footer-text-section h2', {
    xPercent: -50,
    repeat: -1,
    duration: 10,
    ease: 'linear'
  })

  console.clear()

  const sections = gsap.utils.toArray('.scroll-item')
  const title = document.querySelector('.hdr')

  ScrollTrigger.create({
    trigger: sections[0],
    start: 'top top',
    end: 'top+=100 top',
    endTrigger: sections[sections.length - 1],
    pin: title,
    pinSpacing: false,
    //markers: { indent: 300 },
    id: 'H2'
  })

  gsap.to('.who-we-are-section-inner', {
    scrollTrigger: {
      trigger: '.who-we-are-section',
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true,
      markers: true // turn off in prod
    },
    width: '100vw',
    height: '120vh',
    borderRadius: 0,
    scale: 1,
    opacity: 1,
    xPercent: -50,
    yPercent: -50,
    ease: 'power3.out'
  })

  gsap.to('.who-we-are-section-hdr h2', {
    x: '100vw',
    opacity: 1,
    scrollTrigger: {
      trigger: '.who-we-are-section-inner',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      markers: false
    }
  })
})
