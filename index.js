// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoContainer = document.querySelector('.header__logo-container')

headerLogoContainer.addEventListener('click', () => {
  location.href = 'index.html'
})

// ---
// Loom video modal
;(function () {
  var modal    = document.getElementById('video-modal')
  var iframe   = document.getElementById('video-modal__iframe')
  var backdrop = modal.querySelector('.video-modal__backdrop')
  var closeBtn = modal.querySelector('.video-modal__close')

  function openModal (src) {
    iframe.src = src
    modal.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }

  function closeModal () {
    iframe.src = ''
    modal.classList.remove('is-open')
    document.body.style.overflow = ''
  }

  document.querySelectorAll('[data-loom]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      openModal(this.dataset.loom)
    })
  })

  backdrop.addEventListener('click', closeModal)
  closeBtn.addEventListener('click', closeModal)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal()
  })
}())

// ---
// Contact form — local preview fallback
;(function () {
  var form = document.querySelector('.contact__form')
  if (!form) return
  form.addEventListener('submit', function (e) {
    // Only intercept on file:// (local preview); let Netlify handle it on the live site
    if (location.protocol === 'file:') {
      e.preventDefault()
      form.innerHTML = '<p style="font-size:1.8rem;color:#F9FAFB;font-weight:600;text-align:center;padding:4rem 0;">✓ Message received! I\'ll get back to you soon.</p>'
    }
  })
}())

// ---
// Mobile Projects Carousel
;(function () {
  const track   = document.querySelector('.carousel-track')
  const prevBtn = document.querySelector('.carousel-btn--prev')
  const nextBtn = document.querySelector('.carousel-btn--next')

  if (!track || !prevBtn || !nextBtn) return

  const TOTAL_CARDS = track.querySelectorAll('.carousel-card').length
  let currentIndex  = 0

  function getVisible () {
    if (window.innerWidth <= 600) return 1
    if (window.innerWidth <= 900) return 2
    return 3
  }

  function updateCarousel () {
    const visible   = getVisible()
    const maxIndex  = Math.max(0, TOTAL_CARDS - visible)
    if (currentIndex > maxIndex) currentIndex = maxIndex

    // Measure card width from the live DOM (respects flex sizing)
    const firstCard = track.querySelector('.carousel-card')
    const gap       = 16 // matches 1.6rem gap
    const cardWidth = firstCard.getBoundingClientRect().width

    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`

    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex >= maxIndex
  }

  nextBtn.addEventListener('click', function () {
    currentIndex++
    updateCarousel()
  })

  prevBtn.addEventListener('click', function () {
    currentIndex--
    updateCarousel()
  })

  // Reset on resize so layout recalculates
  var resizeTimer
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(function () {
      currentIndex = 0
      updateCarousel()
    }, 120)
  })

  // Initial render
  updateCarousel()
}())

// ---
// Detail page — screenshot slideshow carousel
;(function () {
  var carousel = document.querySelector('.detail-carousel')
  if (!carousel) return

  var track   = carousel.querySelector('.detail-carousel__track')
  var prevBtn = carousel.querySelector('.detail-carousel__btn--prev')
  var nextBtn = carousel.querySelector('.detail-carousel__btn--next')
  var counter = carousel.querySelector('.dc-current')
  var slides  = track.querySelectorAll('.detail-carousel__slide')
  var TOTAL   = slides.length
  var idx     = 0

  function updateDetail () {
    var slideWidth = slides[0].getBoundingClientRect().width
    track.style.transform = 'translateX(-' + (idx * slideWidth) + 'px)'
    prevBtn.disabled = idx === 0
    nextBtn.disabled = idx === TOTAL - 1
    if (counter) counter.textContent = idx + 1
  }

  nextBtn.addEventListener('click', function () { idx++; updateDetail() })
  prevBtn.addEventListener('click', function () { idx--; updateDetail() })

  var resizeTimer2
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer2)
    resizeTimer2 = setTimeout(function () { idx = 0; updateDetail() }, 120)
  })

  updateDetail()
}())
