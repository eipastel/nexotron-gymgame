window.onload = function() {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
      window.location.href = 'http://localhost:3000/index.html';
  } 
  // Caso haja token JWT, não é necessário uma ação adicional aqui, 
  // mas você pode adicionar uma verificação com o servidor se necessário.
};

function addTask() {
  const newTask = document.getElementById('input-new-task');
  const newTaskValue = newTask.value.trim(); // Prevenindo espaços em branco
  const jwtToken = localStorage.getItem('jwtToken');

  if(!newTaskValue) {
    alert("É necessário digitar a tarefa!");
    return; // Retornando aqui para evitar execução adicional
  } 

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
    body: JSON.stringify({ description: newTaskValue })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      showNewTasks(); // Sucesso ao adicionar tarefa e atualizando a lista de tarefas
    } else {
      alert('Erro ao criar tarefa.');
    }
  })
  .catch(error => {
    console.error('Erro ao criar tarefa:', error);
  });

  newTask.value = "";
}

function showNewTasks() {
  const jwtToken = localStorage.getItem('jwtToken');

  fetch('http://localhost:3000/tasks', {
    headers: {
      'Authorization': jwtToken
    }
  })
  .then(response => response.json())
  .then(data => {
    const listOfTasks = document.getElementById('task-list');
    listOfTasks.innerHTML = '';

    data.tasks.forEach(task => {
      listOfTasks.innerHTML += `<li>${task.description}<button id="btn-ok" onclick='finishTask("${task.id}", "${task.description}")'>✓</button></li>`;
    });
  })
  .catch(error => {
    console.error('Erro ao buscar tarefas:', error);
  });
}

function finishTask(taskId, taskDescription) {
  const jwtToken = localStorage.getItem('jwtToken');

  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': jwtToken
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      showNewTasks(); // Sucesso ao excluir a tarefa e atualizando a lista de tarefas
    } else {
      alert('Erro ao excluir tarefa.');
    }
  })
  .catch(error => {
    console.error('Erro ao excluir tarefa:', error);
  });
}

function logout() {
  localStorage.removeItem('jwtToken');
  window.location.href = 'http://localhost:3000/index.html';
}

// Mostrando as tarefas existentes ao carregar a página
showNewTasks();