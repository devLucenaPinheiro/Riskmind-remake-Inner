document.addEventListener('DOMContentLoaded', function () {
  var form     = document.getElementById('contact-form')
  var feedback = document.getElementById('form-feedback')

  if (!form) return

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    var nome     = document.getElementById('nome').value.trim()
    var email    = document.getElementById('email').value.trim()
    var assunto  = document.getElementById('assunto').value.trim()
    var mensagem = document.getElementById('mensagem').value.trim()

    if (!nome || !email || !assunto || !mensagem) {
      feedback.textContent = 'Por favor, preencha todos os campos obrigatórios.'
      feedback.className = 'contact-form__feedback contact-form__feedback--error'
      return
    }

    var submitBtn = form.querySelector('.contact-form__submit')
    submitBtn.textContent = 'Enviando...'
    submitBtn.disabled = true
    feedback.textContent = ''
    feedback.className = 'contact-form__feedback'

    var dados = {
      nome:     nome,
      email:    email,
      assunto:  assunto,
      mensagem: mensagem
    }

    fetch('https://formspree.io/f/mlgzrpyy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(function (res) {
      return res.json().then(function (data) {
        if (res.ok) {
          feedback.textContent = '✓ Mensagem enviada com sucesso! Retornaremos em breve.'
          feedback.className = 'contact-form__feedback contact-form__feedback--success'
          form.reset()
        } else {
          throw new Error(data.error || 'Erro ao enviar.')
        }
      })
    })
    .catch(function (err) {
      feedback.textContent = 'Erro ao enviar. Tente novamente ou escreva para contato@riskmind.com.br'
      feedback.className = 'contact-form__feedback contact-form__feedback--error'
    })
    .finally(function () {
      submitBtn.textContent = 'Enviar mensagem →'
      submitBtn.disabled = false
    })
  })
})