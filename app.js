// define ui variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listners
loadEventListeners();

function loadEventListeners() {

  //Dom load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  //remove task
  taskList.addEventListener('click', removeTask);
  //remove task
  clearBtn.addEventListener('click', clearTask);
  //filter task
  filter.addEventListener('keyup', filterTask);
}
//get task from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem('task') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('task'));
  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}
//add task
function addTask(e) {
  if (taskInput.value === '') {
    alert("add a task");
  }
  //create li elements
  else{
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  //append in Ls
  taskList.appendChild(li);
  //store in Ls
  storeinLocalstorage(taskInput.value);
  // clear input
  taskInput.value = '';
  e.preventDefault();
  }
}

//store task
function storeinLocalstorage(task) {
  let tasks;
  if (localStorage.getItem('task') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('task'));
  }
  tasks.push(task);
  localStorage.setItem('task', JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('are you sure?')) {
      e.target.parentElement.parentElement.remove();


      //remove from ls
      removeTaskfromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}
//remove from ls
function removeTaskfromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('task') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('task'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('task', JSON.stringify(tasks));
}

//clear task
function clearTask() {

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //clear task from ls
  clearTaskfromLocalStorage();
}
function clearTaskfromLocalStorage() {
  localStorage.clear();
}

//filter task
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    }
    else {
      task.style.display = 'none';
    }
  });
}