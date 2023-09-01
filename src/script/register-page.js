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

user.addEventListener('keyup', () => {
  if(user.value.length <= 2){
    labelUser.setAttribute('style', 'color: red')
    labelUser.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    user.setAttribute('style', 'border-color: red')
    validUser = false
  } else {
    labelUser.setAttribute('style', 'color: green')
    labelUser.innerHTML = 'Nome'
    user.setAttribute('style', 'border-color: green')
    validUser = true
  }
})

username.addEventListener('keyup', () => {
  if(username.value.length <= 4){
    labelUsername.setAttribute('style', 'color: red')
    labelUsername.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
    username.setAttribute('style', 'border-color: red')
    validUsername = false
  } else {
    labelUsername.setAttribute('style', 'color: green')
    labelUsername.innerHTML = 'Usuário'
    username.setAttribute('style', 'border-color: green')
    validUsername = true
  }
})

password.addEventListener('keyup', () => {
  if(password.value.length <= 5){
    labelPassword.setAttribute('style', 'color: red')
    labelPassword.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    password.setAttribute('style', 'border-color: red')
    validPassword = false
  } else {
    labelPassword.setAttribute('style', 'color: green')
    labelPassword.innerHTML = 'Senha'
    password.setAttribute('style', 'border-color: green')
    validPassword = true
  }
})

confirmPassword.addEventListener('keyup', () => {
  if(password.value != confirmPassword.value){
    labelConfirmPassword.setAttribute('style', 'color: red')
    labelConfirmPassword.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmPassword.setAttribute('style', 'border-color: red')
    validConfirmPassword = false
  } else {
    labelConfirmPassword.setAttribute('style', 'color: green')
    labelConfirmPassword.innerHTML = 'Confirmar Senha'
    confirmPassword.setAttribute('style', 'border-color: green')
    validConfirmPassword = true
  }
})

function register(){
  if(validUser && validUsername && validPassword && validConfirmPassword){
    let userList = JSON.parse(localStorage.getItem('userList') || '[]')
    
   userList.push(
    {
      nameData: user.value,
      usernameData: username.value,
      passwordData: password.value
    }
    )
    
    localStorage.setItem('userList', JSON.stringify(userList))
    
   
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    setTimeout(()=>{
        window.location.href = '../../index.html'
    }, 3000)
  
    
  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

btn.addEventListener('click', ()=>{
  let seePassword = document.querySelector('#password')
  
  if(seePassword.getAttribute('type') == 'password'){
    seePassword.setAttribute('type', 'text')
  } else {
    seePassword.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', ()=>{
  let seeConfirmPassword = document.querySelector('#confirmSenha')
  
  if(seeConfirmPassword.getAttribute('type') == 'password'){
    seeConfirmPassword.setAttribute('type', 'text')
  } else {
    seeConfirmPassword.setAttribute('type', 'password')
  }
})