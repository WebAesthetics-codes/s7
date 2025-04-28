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
})
