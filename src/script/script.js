let showPasswordBtn = document.querySelector('.fa-solid')

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

// Botão de entrar
function login(){
  // Variáveis para valores do usuário e senha
  let username = document.querySelector('#username')
  let password = document.querySelector('#password')
  
  let msgError = document.querySelector('#msgError')
  let userList = []
  
  let validUser = {
    name: '',
    username: '',
    email: '',
    password: ''
  }
  
  userList = JSON.parse(localStorage.getItem('userList'))
  
  userList.forEach((item) => {
    if(username.value == item.usernameData && password.value == item.passwordData){
       
      validUser = {
         name: item.nameData,
         username: item.usernameData,
         email: item.emailData,
         password: item.passwordData
       }
      
    }
  })
   
  if(username.value == validUser.username && password.value == validUser.password){
    window.location.href = 'src/pages/main-page.html'
    
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom
    
    localStorage.setItem('token', token)
    localStorage.setItem('loggedUser', JSON.stringify(validUser))
  } else {
    username.setAttribute('style', 'border-color: red')
    password.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    username.focus()
  }
}
