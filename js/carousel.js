function initCarousel() {
  const carousel = document.querySelector('.clients-carousel')
  const track    = document.querySelector('.carousel-track')
  if (!carousel || !track) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const speed  = 0.5
  let position = 0
  let paused   = false
  let halfWidth = 0

  function cloneItems() {
    track.querySelectorAll('[aria-hidden="true"]').forEach(function(el) {
      el.remove()
    })

    const items = Array.from(track.querySelectorAll('.carousel-item'))
    items.forEach(function(item) {
      const clone = item.cloneNode(true)
      clone.setAttribute('aria-hidden', 'true')
      track.appendChild(clone)
    })

    halfWidth = track.scrollWidth / 2
  }

  function animate() {
    if (!paused && halfWidth > 0) {
      position += speed

      if (position >= halfWidth) {
        position = 0
      }

      track.style.transform = 'translateX(-' + position + 'px)'
    }

    requestAnimationFrame(animate)
  }

  function start() {
    cloneItems()
    requestAnimationFrame(animate)
  }

  carousel.addEventListener('mouseenter', function() { paused = true; })
  carousel.addEventListener('mouseleave', function() { paused = false; })

  document.addEventListener('visibilitychange', function() {
    paused = document.hidden
  })

  const images = Array.from(track.querySelectorAll('img'))
  if (images.length === 0) {
    start()
    return
  }

  let loaded = 0
  function onLoad() {
    loaded++
    if (loaded >= images.length) start()
  }

  images.forEach(function(img) {
    if (img.complete && img.naturalWidth > 0) {
      onLoad()
    } else {
      img.addEventListener('load', onLoad)
      img.addEventListener('error', onLoad)
    }
  })
}

document.addEventListener('DOMContentLoaded', initCarousel)