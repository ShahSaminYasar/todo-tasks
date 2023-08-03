const todoInput = document.getElementById("todo_input");
const todoTasks = document.querySelector(".todo_tasks");
const deleteModal = document.querySelector("#delete_modal");
const editModal = document.querySelector("#edit_modal");
const editInput = document.getElementById("edit_input");

// Tasks Array
var todoTasksArray = [];

// Variables
var indexToBeDeleted;
var indexToBeEdited;

renderTasks();

function addTask(e) {
  e.preventDefault();

  //   Get Input Value
  var text = todoInput.value;

  if (text != "") {
    todoTasksArray.push(text);
    todoInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  todoTasks.innerHTML = "";
  todoTasksArray.forEach((task) => {
    var todoTask = document.createElement("div");
    todoTask.classList.add("todo_task");
    todoTask.innerHTML = `<div class="arrow_buttons">
                                    <button onclick="moveUp(${todoTasksArray.indexOf(
                                      task
                                    )})">
                                        <i class="fa-solid fa-chevron-up"></i>
                                    </button>
                                    <button onclick="moveDown(${todoTasksArray.indexOf(
                                      task
                                    )})">
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </button>
                         </div>
                        <span>${task}</span>
                        <div class="buttons_group">
                                    <button onclick="attemptDelete(${todoTasksArray.indexOf(
                                      task
                                    )})">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                    <button onclick="attemptEdit(${todoTasksArray.indexOf(
                                      task
                                    )})">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </button>
                        </div>`;
    todoTasks.append(todoTask);
  });
}

function moveUp(index) {
  if (index > 0) {
    var currentText = todoTasksArray[index];
    var previousText = todoTasksArray[index - 1];

    todoTasksArray[index] = previousText;
    todoTasksArray[index - 1] = currentText;

    renderTasks();
  }
}

function moveDown(index) {
  if (index <= todoTasksArray.length - 2) {
    var currentText = todoTasksArray[index];
    var nextText = todoTasksArray[index + 1];

    todoTasksArray[index] = nextText;
    todoTasksArray[index + 1] = currentText;

    renderTasks();
  }
}

function attemptDelete(index) {
  deleteModal.style.display = "grid";
  indexToBeDeleted = index;
}

function cancelDelete() {
  deleteModal.style.display = "none";
}

function deleteTask() {
  todoTasksArray.splice(indexToBeDeleted, 1);
  deleteModal.style.display = "none";
  renderTasks();
}

function attemptEdit(index) {
  editModal.style.display = "grid";
  editInput.value = todoTasksArray[index];
  indexToBeEdited = index;
}

function cancelEdit(e) {
  e.preventDefault();
  editModal.style.display = "none";
}

function editTask(e) {
  e.preventDefault();
  var updatedText = editInput.value;
  todoTasksArray[indexToBeEdited] = updatedText;
  editModal.style.display = "none";
  renderTasks();
}
