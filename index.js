/* создаем класс с обьектом вместо функции(так проще пр множестве задач)*/
class Task {
    constructor(description, status = "new", priority = "middle") {
         this.description = description;
         this.status = status;
         this.proirity = priority;
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }
}

//создаем массив для хранения задач

let tasks= [];

// создаем функции для добавления задач, для удаления задач, для сортировки  по приоритету

function addTask(description, status, priority) {
    const task = new Task(description, status, priority);
    tasks.push(task);
    saveToLocalStorage();
}

function removeTask(index) {
   tasks.splice(index, 1);
   saveToLocalStorage();
}

function sortTasksByPriority() {
    tasks.sort((a, b) => {
        const priorityOrder = {"high": 1, "middle": 2, "low": 3};
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

}

//фильтр задач по статусу и приоритету

function filterTasksByStatus(status) {
    return tasks.filter(task => task.status === status);
  }
  
  function filterTasksByPriority(priority) {
    return tasks.filter(task => task.priority === priority);
  }

  // сохраняем задачи в localStorage

  function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadFromLocalStorage() {
    const data = localStorage.getItem("tasks");
    if (data) {
      tasks = JSON.parse(data).map(task => new Task(task.description, task.status, task.priority));
    }
  }

  // Отображаем задачи 
  
  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task";
      taskElement.innerHTML = `
        <p><strong>${task.description}</strong></p>
        <p>Status: ${task.status}</p>
        <p>Priority: ${task.priority}</p>
        <button onclick="removeTask(${index}); renderTasks();">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  }
  
  function handleAddTask() {
    const taskInput = document.getElementById("taskInput");
    const taskPriority = document.getElementById("taskPriority").value;
    if (taskInput.value.trim()) {
      addTask(taskInput.value, "new", taskPriority);
      taskInput.value = "";
      renderTasks();
    }
  }
  
  loadFromLocalStorage();
  renderTasks();

 

  
  

  