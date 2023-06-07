const main = document.getElementById("main");
const todoFormInput = document.querySelector("#todo_form_input");
const todoTasks = document.querySelector(".todo_tasks");
const confirmationModal = document.querySelector(".confirmation_modal");

var tasks = [];
var indexOfTaskToBeDeleted;

function addToList(e) {
  e.preventDefault();

  if (todoFormInput.value !== "") {
    var task = todoFormInput.value;
    tasks.push(task);

    todoFormInput.value = "";

    renderTasks();
  }
}

function attemptDeleteTask(e, indexOfTask) {
  e.preventDefault();
  indexOfTaskToBeDeleted = indexOfTask;
  confirmationModal.classList.add("active");
  main.classList.add("active");
}

function cancelDelete() {
  confirmationModal.classList.remove("active");
  main.classList.remove("active");
}

function deleteTask() {
  tasks.splice(indexOfTaskToBeDeleted, 1);
  cancelDelete();
  renderTasks();
}

function renderTasks() {
  todoTasks.innerHTML = "";
  tasks.forEach((task) => {
    let todoTask = document.createElement("div");
    todoTask.classList.add("todo_task");
    todoTask.innerHTML = `<p>${task}</p>
                            <button onclick="attemptDeleteTask(event, ${tasks.indexOf(
                              task
                            )})"><i class="fa-solid fa-trash"></i></button>`;
    todoTasks.append(todoTask);
  });
}
