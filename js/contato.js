document.addEventListener('DOMContentLoaded', function () {
  var form     = document.getElementById('contact-form')
  var feedback = document.getElementById('form-feedback')

  if (!form) return

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    var nome     = document.getElementById('nome').value.trim()
    var email    = document.getElementById('email').value.trim()
    var mensagem = document.getElementById('mensagem').value.trim()

    if (!nome || !email || !mensagem) {
      feedback.textContent = 'Por favor, preencha todos os campos obrigatórios.'
      feedback.className = 'contact-form__feedback contact-form__feedback--error'
      return
    }

    var submitBtn = form.querySelector('.contact-form__submit')
    submitBtn.textContent = 'Enviando...'
    submitBtn.disabled = true
    setTimeout(function () {
      feedback.textContent = '✓ Mensagem enviada com sucesso! Retornaremos em breve.'
      feedback.className = 'contact-form__feedback contact-form__feedback--success'
      form.reset()
      submitBtn.textContent = 'Enviar mensagem →'
      submitBtn.disabled = false
    }, 1200)
  })
})