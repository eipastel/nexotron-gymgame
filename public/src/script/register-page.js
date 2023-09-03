// Variáveis iniciais para fazer a coleta das informações do DOM
let showPasswordBtn = document.querySelector('.showPass')
let showConfirmPasswordBtn = document.querySelector('.showConfirmPass')

let user = document.querySelector('#user')
let labelUser = document.querySelector('#labelUser')
let validUser = false

let username = document.querySelector('#username')
let labelUsername = document.querySelector('#labelUsername')
let validUsername = false

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let password = document.querySelector('#password')
let labelPassword = document.querySelector('#labelPassword')
let validPassword = false

let confirmPassword = document.querySelector('#confirmPassword')
let labelConfirmPassword = document.querySelector('#labelConfirmPassword')
let validConfirmPassword = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// Evento listener no botão para ver a senha
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

// Evento listener no botão para ver o confirme senha
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
    validUser = false
  } else {

    // Nome é válido
    validUser = true
  }
})

// Verificando se usuário está válido
username.addEventListener('keyup', () => {
  if(username.value.length <= 4){

    // Usuário não é válido
    validUsername = false
  } else {

    // Usuário é válido
    validUsername = true
  }
})

// Verificando se e-mail está válido
email.addEventListener('keyup', () => {
  if(email.value.length <= 10){

    // E-mail não é válido
    validEmail = false
  } else {

    // E-mail é válido
    validEmail = true
  }
})

// Verificando se a senha está válida
password.addEventListener('keyup', () => {
  if(password.value.length <= 5){

    // Senha não é válida
    validPassword = false
  } else {

    // Senha é válido
    validPassword = true
  }
})

// Verificando se a confirme senha está válido
confirmPassword.addEventListener('keyup', () => {
  if(password.value != confirmPassword.value){

    // Confirmar senha não é válido
    validConfirmPassword = false
  } else {

    // Confirmar senha é válido
    validConfirmPassword = true
  }
})

// Função do botão "Registrar"
function registera(){
  if(validUser && validUsername && validPassword && validConfirmPassword && validEmail){

    
    // Mostrando a mensagem de sucesso e apagando a mensagem de erro
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    // Definindo um tempo de X segundos para trocar pro index
    setTimeout(()=>{
        window.location.href = '../../index.html'
    }, 3000)
  
    
  } else {
    // Caso não sejam válidos, mostrando a mensagem de erro e apagamento a mensagem de sucesso.
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

function register() {
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
    if (data.error) {
        // tratar erro
        console.error(data.error);
    } else {
        // cadastro bem-sucedido
        console.log('Cadastro bem-sucedido');
    }
})
.catch((error) => {
    console.error('Erro:', error);
});
}