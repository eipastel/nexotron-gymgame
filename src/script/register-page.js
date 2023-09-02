// Variáveis iniciais para fazer a coleta das informações do DOM
let btn = document.querySelector('#seePassword')
let btnConfirm = document.querySelector('#seeConfirmPassword')

let user = document.querySelector('#user')
let labelUser = document.querySelector('#labelUser')
let validUser = false

let username = document.querySelector('#username')
let labelUsername = document.querySelector('#labelUsername')
let validUsername = false

let password = document.querySelector('#password')
let labelPassword = document.querySelector('#labelPassword')
let validPassword = false

let confirmPassword = document.querySelector('#confirmPassword')
let labelConfirmPassword = document.querySelector('#labelConfirmPassword')
let validConfirmPassword = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

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
function register(){
  if(validUser && validUsername && validPassword && validConfirmPassword){
    // Acessar a lista no local storage (ou criando uma vazia caso não tenha)
    let userList = JSON.parse(localStorage.getItem('userList') || '[]')
    
    // Colocando o usuário válido dentro da lista no local storage
    userList.push(
    {
      nameData: user.value,
      usernameData: username.value,
      passwordData: password.value
    }
    )
    
    // Transformando em string
    localStorage.setItem('userList', JSON.stringify(userList))
    
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

// Evento listener no botão para ver a senha
btn.addEventListener('click', ()=>{
  let seePassword = document.querySelector('#password')
  
  if(seePassword.getAttribute('type') == 'password'){
    seePassword.setAttribute('type', 'text')
  } else {
    seePassword.setAttribute('type', 'password')
  }
})

// Evento listener no botão para ver o confirme senha
btnConfirm.addEventListener('click', ()=>{
  let seeConfirmPassword = document.querySelector('#confirmSenha')
  
  if(seeConfirmPassword.getAttribute('type') == 'password'){
    seeConfirmPassword.setAttribute('type', 'text')
  } else {
    seeConfirmPassword.setAttribute('type', 'password')
  }
})