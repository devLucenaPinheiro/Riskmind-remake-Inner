const phrases = [
  'Data Science aplicada a resultados reais',
  'Gestão de riscos que antecipa problemas',
  'Mais de 15 anos transformando dados em decisões',
  'Machine Learning aplicado ao mercado de seguros',
  'Ciência de dados com precisão e propósito',
]

function initPhrases() {
  const badge = document.querySelector('.hero__badge')
  if (!badge) return

  badge.innerHTML = '<span class="hero__badge-dot"></span><span class="hero__badge-text"></span>'

  const textEl = badge.querySelector('.hero__badge-text')
  let index = 0

  textEl.textContent = phrases[0]
  textEl.style.opacity = '1'
  textEl.style.transform = 'translateY(0)'

  function nextPhrase() {
    textEl.style.opacity = '0'
    textEl.style.transform = 'translateY(8px)'

    setTimeout(function () {
      index = (index + 1) % phrases.length
      textEl.textContent = phrases[index]

      textEl.style.transition = 'none'
      textEl.style.transform = 'translateY(-8px)'

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          textEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
          textEl.style.opacity = '1'
          textEl.style.transform = 'translateY(0)'
        })
      })

    }, 500)
  }

  setInterval(nextPhrase, 4000)
}

document.addEventListener('DOMContentLoaded', initPhrases)