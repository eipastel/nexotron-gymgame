window.onload = function() {
  const jwtToken = localStorage.getItem('jwtToken');

  if (jwtToken) {
      window.location.href = 'http://localhost:3000/src/pages/main-page.html';
  }
};

// Variáveis iniciais para fazer a coleta das informações do DOM
let showPasswordBtn = document.querySelector('.showPass')
let showConfirmPasswordBtn = document.querySelector('.showConfirmPass')

let user = document.querySelector('#name')
let validUser = false

let username = document.querySelector('#username')
let validUsername = false

let email = document.querySelector('#email')
let validEmail = false

let password = document.querySelector('#password')
let validPassword = false

let confirmPassword = document.querySelector('#confirmPassword')
let validConfirmPassword = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// Event listener no botão para ver a senha
showPasswordBtn.addEventListener('click', ()=>{
  let inputPassword = document.querySelector('#password')
  
  if(inputPassword.getAttribute('type') == 'password'){
    inputPassword.setAttribute('type', 'text')
    showPasswordBtn.classList.remove('fa-eye-slash')
    showPasswordBtn.classList.add('fa-eye')
  } else {
    inputPassword.setAttribute('type', 'password')
    showPasswordBtn.classList.add('fa-eye-slash')
    showPasswordBtn.classList.remove('fa-eye')
  }
})

// Event listener no botão para ver o confirme senha
showConfirmPasswordBtn.addEventListener('click', ()=>{
  let inputConfirmPassword = document.querySelector('#confirmPassword')
  
  if(inputConfirmPassword.getAttribute('type') == 'password'){
    inputConfirmPassword.setAttribute('type', 'text')
    showConfirmPasswordBtn.classList.remove('fa-eye-slash')
    showConfirmPasswordBtn.classList.add('fa-eye')
  } else {
    inputConfirmPassword.setAttribute('type', 'password')
    showConfirmPasswordBtn.classList.add('fa-eye-slash')
    showConfirmPasswordBtn.classList.remove('fa-eye')
  }
})

// Verificando se nome está válido
user.addEventListener('keyup', () => {
  if(user.value.length <= 2){

    // Nome não é válido
    return validUser = false
  } else {

    // Nome é válido
    return validUser = true
  }
})

// Verificando se usuário está válido
username.addEventListener('keyup', () => {
  if(username.value.length <= 4){

    // Usuário não é válido
    return validUsername = false
  } else {

    // Usuário é válido
    return validUsername = true
  }
})

// Verificando se e-mail está válido
email.addEventListener('keyup', () => {
  if(email.value.length <= 10){

    // E-mail não é válido
    return validEmail = false
  } else {

    // E-mail é válido
    return validEmail = true
  }
})

// Verificando se a senha está válida
password.addEventListener('keyup', () => {
  if(password.value.length <= 5){

    // Senha não é válida
    return validPassword = false
  } else {

    // Senha é válido
    return validPassword = true
  }
})

// Verificando se a confirme senha está válido
confirmPassword.addEventListener('keyup', () => {
  if(password.value != confirmPassword.value){

    // Confirmar senha não é válido
    return validConfirmPassword = false
  } else {

    // Confirmar senha é válido
    return validConfirmPassword = true
  }
})

// Função do botão "Registrar"
function register(){

  // Validando se todos os campos estão preenchidos corretamente
  if(validUser && validUsername && validPassword && validConfirmPassword && validEmail){
    const name = document.getElementById('name').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
      }),
      })
    .then(response => response.json())
    .then(data => {
      if (data.error === "USER_ALREADY_EXISTS") {
          // Erro usuário já existente

          msgError.setAttribute('style', 'display: block')
          msgError.innerHTML = 'Usuário já cadastrado.'
          msgSuccess.innerHTML = ''
          msgSuccess.setAttribute('style', 'display: none')
      } else {
        // cadastro bem-sucedido

        // Mostrando a mensagem de sucesso e apagando a mensagem de erro
        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = 'Cadastrando usuário...'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''

        // Definindo um tempo de X (nesse caso 1000 = 1 segundo) segundos para redirecionar para o index
        setTimeout(()=>{
          window.location.href = '../../index.html'
        }, 3000)
      }
      })
      // Caso haja algum erro não identificado do servidor ou outro.
      .catch((error) => {
          console.error('Erro não identificado:', error);
      });
    
  } else {
    // Caso não sejam válidos, mostrando a mensagem de erro e apagamento a mensagem de sucesso.

    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Insira todos os campos corretamente antes de continuar.'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}