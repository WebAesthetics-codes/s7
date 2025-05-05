$(document).ready(function () {
  loading()

  setTimeout(() => {
    $('#loader').hide()
    $('#view').show()
    $('#navbar').show()
  }, 5000)

  function loading () {
    $('#view').hide()
    $('#navbar').hide()
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

  $(window).scroll(function () {
    if ($(this).scrollTop() >= 1400) {
      console.log('bottom')
      $('#banner-section').css({ background: '#000' })
    } else {
      console.log('top')
      $('#banner-section').css({ background: '' })
    }
  })
})
