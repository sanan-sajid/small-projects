let tasks = [];
let completedTasks = [];

const container = document.getElementById("task-container");
const completedContainer = document.getElementById("completed-task-container");
const submitButton = document.getElementById("submit-button");
const inputTask = document.getElementById("task-name");
let cnt = 1;
let inputField = "";

inputTask.addEventListener("input", (e) => {
  inputField = e.target.value;
});

function getTime() {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const currentDate = `${year}-${month}-${date}`;
  const currentTime = `${hours}:${minutes}:${seconds}`;
  return [currentDate, currentTime];
}

function addTask() {
  const currTime = getTime();
  const newTask = {
    id: cnt,
    name: inputField,
    date: currTime[0],
    status: "not-completed",
    time: currTime[1],
  };
  cnt++;
  tasks.push(newTask);
  console.log(tasks);
  renderTasks();
}

submitButton.addEventListener("click", addTask);

function handleClick(taskID) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskID) {
      completedTasks.push(tasks[i]);
      tasks[i].status = "completed";
      tasks.splice(i, 1);
      renderTasks();
      return;
    }
  }
}
function createTask(task) {
  const listItem = document.createElement("div");
  listItem.classList = "task"; //for css

  const taskName = document.createElement("h3");
  taskName.textContent = task.name;

  const taskDate = document.createElement("p");
  taskDate.textContent = `Date - ${task.date}`;

  const status = document.createElement("p");
  status.textContent = `Status: ${task.status}`;

  const doneButton = document.createElement("button");
  doneButton.textContent = "Done ✅";
  doneButton.onclick = () => {
    handleClick(task.id);
  };

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove ❌";
  listItem.appendChild(taskName);
  listItem.appendChild(taskDate);
  listItem.appendChild(doneButton);
  listItem.appendChild(removeButton);
  listItem.appendChild(status);
  return listItem;
}

function renderTasks() {
  completedContainer.innerHTML = "";
  container.innerHTML = "";
  tasks.forEach((task, index) => {
    container.appendChild(createTask(task, index));
  });
  completedTasks.forEach((task, index) => {
    completedContainer.appendChild(createTask(task, index));
  });
}

renderTasks(); //for staring
