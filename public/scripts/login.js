window.onload = function() {
  // Verifica se o token JWT está presente no local storage. Se estiver, redireciona para a página principal.
  const jwtToken = localStorage.getItem('jwtToken');
  if (jwtToken) {
      window.location.href = 'http://localhost:3000/pages/main-page.html';
  }
};

// Evento para detectar a tecla 'Enter' e acionar a função de login.
window.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
      login(); 
  }
});

// Seleção do botão para mostrar/ocultar a senha
let showPasswordBtn = document.querySelector('.fa-solid');
showPasswordBtn.addEventListener('click', () => {
  let inputPassword = document.querySelector('#password');
  
  // Alterna o tipo de entrada e o ícone de visualização da senha
  if(inputPassword.getAttribute('type') === 'password'){
      inputPassword.setAttribute('type', 'text');
      showPasswordBtn.classList.remove('fa-eye-slash');
      showPasswordBtn.classList.add('fa-eye');
  } else {
      inputPassword.setAttribute('type', 'password');
      showPasswordBtn.classList.add('fa-eye-slash');
      showPasswordBtn.classList.remove('fa-eye');
  }
});

// Função para gerenciar o processo de login
function login() {
  const username = document.getElementById('username').value;
  const usernameInput = document.getElementById('username');
  const password = document.getElementById('password').value;
  const passwordInput = document.getElementById('password');
  const loginErrorIcon = document.querySelector('.loginError i');
  let msgError = document.querySelector('#msgError');

  fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: username,
          password: password,
      }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.error === "USER_NOT_FOUND" || data.error === "INVALID_PASSWORD") {
          
          // Atualiza a UI para mostrar um erro se o usuário ou a senha estiverem incorretos
          loginErrorIcon.classList.add('showLoginError');
          usernameInput.style.border = '1px solid rgb(199, 31, 31)';
          passwordInput.style.border = '1px solid rgb(199, 31, 31)';
          msgError.style.display = 'block';
          msgError.textContent = 'Usuário ou senha incorretos';
          usernameInput.focus();

      } else {
          
          // Se o login for bem-sucedido, armazena o token JWT e redireciona para a página principal
          localStorage.setItem('jwtToken', data.token);
          window.location.href = 'pages/main-page.html';
      }
  })
  .catch(error => {
      console.error('Erro ao realizar o login:', error);
  });
}
