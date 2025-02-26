// Declare the tasks array
let tasks = [];

// Function to add a task
function addTask() {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;
    const dueTime = document.getElementById('due-time').value;

    if (taskName && dueDate && dueTime) {
        const dueDateTimeString = `${dueDate}T${dueTime}`;
        const dueDateTime = new Date(dueDateTimeString);

        if (isNaN(dueDateTime)) {
            alert("Invalid date or time. Please check your input.");
            return;
        }

        const task = {
            id: Date.now(),
            name: taskName,
            dueDate: dueDateTime,
            completed: false
        };

        tasks.push(task);
        saveTasksToLocalStorage();
        renderTasks();
    } else {
        alert("Please fill in all fields.");
    }
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Render tasks on the page
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - Due: ${task.dueDate.toLocaleString()}`;
        taskList.appendChild(taskItem);
    });
}

// Load tasks when the page is ready
window.onload = loadTasksFromLocalStorage;









