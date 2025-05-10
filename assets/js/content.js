$(document).ready(function () {
  //gsap.registerPlugin(ScrollTrigger)

  const textElement = document.getElementById('textToAnimate')
  const rawText = textElement.textContent

  // Step 1: Split the text into words, and wrap each letter in a <span class="letter"> tag
  textElement.innerHTML = rawText
    .split(' ') // Split by space to preserve words
    .map(
      word =>
        word
          .split('') // Split each word into characters
          .map(char => `<span class="letter">${char}</span>`) // Wrap each character in a span
          .join('') // Join the characters back into the word
    )
    .join(' ') // Join the words back with a space to preserve word spacing

  // Step 2: Create a GSAP timeline for animation
  const letters = document.querySelectorAll('.letter')
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.content-section-scroll',
      start: 'top top',
      end: `+=${letters.length * 20}`,
      scrub: true,
      pin: true
    }
  })

  // Step 3: Apply animation on each letter
  letters.forEach((letter, i) => {
    tl.to(
      letter,
      {
        color: '#fff', // Change color to white as an example
        duration: 0.05
      },
      i * 0.02
    ) // Add delay for each letter
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
})
