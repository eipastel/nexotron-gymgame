let showPasswordBtn = document.querySelector('.fa-eye')

showPasswordBtn.addEventListener('click', ()=>{
  let inputPassword = document.querySelector('#password')
  
  if(inputPassword.getAttribute('type') == 'password'){
    inputPassword.setAttribute('type', 'text')
  } else {
    inputPassword.setAttribute('type', 'password')
  }
})

function login(){
  let username = document.querySelector('#username')
  let usernameLabel = document.querySelector('#usernameLabel')
  
  let password = document.querySelector('#password')
  let passwordLabel = document.querySelector('#passwordLabel')
  
  let msgError = document.querySelector('#msgError')
  let userList = []
  
  let validUser = {
    name: '',
    username: '',
    password: ''
  }
  
  userList = JSON.parse(localStorage.getItem('userList'))
  
  userList.forEach((item) => {
    if(username.value == item.usernameData && password.value == item.passwordData){
       
      validUser = {
         name: item.nameData,
         username: item.usernameData,
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
    usernameLabel.setAttribute('style', 'color: red')
    user.setAttribute('style', 'border-color: red')
    passwordLabel.setAttribute('style', 'color: red')
    password.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    user.focus()
  }
  
}
