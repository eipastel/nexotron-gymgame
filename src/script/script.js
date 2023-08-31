// Criando a chave do local storage
const localStorageKey = 'nexotron-list-tasks'

// Verificando se a tarefa já existe
function isUnique() {
  // Pegando os valores da tarefa do local storage e do input
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  const newTask = document.getElementById('input-new-task')
  const newTaskValue = newTask.value
  let isUnique = values.find(task => task.name == newTaskValue)

  // Se não existe, retorna false, caso contrário, true.
  return !isUnique ? false : true
}

function addTask() {
  const newTask = document.getElementById('input-new-task')
  const newTaskValue = newTask.value

  // Validação se há tarefa 
  if(!newTaskValue) {
    alert("É necessário digitar a tarefa!")
  } else if(isUnique()) {
    alert("Essa tarefa já existe!")
  } else {
    // Incrementando no local storage

    // Validando e transformando tarefas em array.
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
      name: newTaskValue
    })
    localStorage.setItem(localStorageKey, JSON.stringify(values))

    //Atualizando na tela os itens atuais
    showNewTasks()
  }

  // Limpando o valor do input após clicar no botão
  newTask.value = ""
}

function showNewTasks() {
  // Definindo qual tarefa a ser adicionada
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

  // Identificando e resetando a lista para não mostrar duplicado
  const listOfTasks = document.getElementById('task-list')
  listOfTasks.innerHTML = ''

  // Mostrando a tarefa no documento
  for(let listIndex = 0; listIndex < values.length; listIndex++) {
    // Ícone de check como SVG do Bootstrap
    listOfTasks.innerHTML += `<li>${values[listIndex]['name']}<button id="btn-ok" onclick='finishTask("${values[listIndex]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
  </svg></button></li>`
  }
}

function finishTask(task) {
  // Procurando o índice da tarefa a ser removida
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let taskIndex = values.findIndex(taskToRemove => taskToRemove.name == task)

  // Deletando a tarefa do local storage
  values.splice(taskIndex, 1)
  localStorage.setItem(localStorageKey, JSON.stringify(values))

  // Atualizando na tela os itens atuais
  showNewTasks()
}

// Mostrando de começo as tarefas existentes.
showNewTasks()