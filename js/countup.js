const counters = [

  { id: 'stat-anos',     endVal: 15,   prefix: '+', suffix: '' },
  { id: 'stat-areas',    endVal: 8,    prefix: '+', suffix: '' },
  { id: 'stat-projetos', endVal: 50,   prefix: '+', suffix: '' },

  { id: 'stat-anos-about',     endVal: 15,   prefix: '+', suffix: '' },
  { id: 'stat-fundacao-about', endVal: 2006, prefix: '',  suffix: '' },
  { id: 'stat-areas-about',    endVal: 8,    prefix: '',  suffix: '+' },
]

function animateNumber(el, endVal, prefix, suffix, duration) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed  = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(eased * endVal)

    el.textContent = prefix + current + suffix

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {

      el.textContent = prefix + endVal + suffix
    }
  }

  requestAnimationFrame(update)
}

function initCounters() {
  const observer = new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return

      const el      = entry.target
      const endVal  = Number(el.dataset.endval)
      const prefix  = el.dataset.prefix  || ''
      const suffix  = el.dataset.suffix  || ''
      const duration = 1600

      animateNumber(el, endVal, prefix, suffix, duration)


      obs.unobserve(el)
    })
  }, {
    threshold: 0.3,
  })

  counters.forEach(function(counter) {
    const el = document.getElementById(counter.id)

    if (!el) {
      console.warn('CountUp: elemento #' + counter.id + ' não encontrado')
      return
    }


    el.dataset.endval = counter.endVal
    el.dataset.prefix = counter.prefix
    el.dataset.suffix = counter.suffix


    el.textContent = counter.prefix + '0' + counter.suffix

    observer.observe(el)
  })
}

document.addEventListener('DOMContentLoaded', initCounters)