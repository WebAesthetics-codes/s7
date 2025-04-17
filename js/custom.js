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

  gsap.to('.video-section', {
    scrollTrigger: {
      trigger: '.video-section',
      start: 'top center',
      end: 'bottom top',
      scrub: true,
      markers: false
    },
    scale: 1,
    opacity: 1,
    width: '100vw',
    height: '100vh',
    bottom: '0',
    transform: 'translateX(-50%)',
    ease: 'power3.out'
  })
})
