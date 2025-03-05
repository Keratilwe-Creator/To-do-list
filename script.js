let tasks = [];
let taskToDelete = null;

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskName && dueDate) {
        const task = {
            id: Date.now(),
            name: taskName,
            dueDate: dueDate,
            completed: false
        };

        tasks.push(task);
        saveTasksToLocalStorage();
        renderTasks();
        clearInputFields();
    } else {
        alert("Please fill in all fields.");
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
        
        taskItem.innerHTML = `
            <input type="checkbox" onclick="toggleCompletion(${task.id})" ${task.completed ? 'checked' : ''}>
            <span>${task.name} (Due: ${task.dueDate})</span>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="showDeleteConfirmation(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(taskItem);
    });
}

function toggleCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    renderTasks();
}


function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    document.getElementById('edit-task-name').value = task.name;
    document.getElementById('edit-due-date').value = task.dueDate;

    taskToDelete = taskId;
    document.getElementById('edit-modal').style.display = 'flex';
}


function saveEdit() {
    const taskName = document.getElementById('edit-task-name').value;
    const dueDate = document.getElementById('edit-due-date').value;

    const task = tasks.find(task => task.id === taskToDelete);
    task.name = taskName;
    task.dueDate = dueDate;

    saveTasksToLocalStorage();
    renderTasks();
    closeModal();
}


function showDeleteConfirmation(taskId) {
    taskToDelete = taskId;
    document.getElementById('confirm-modal').style.display = 'flex';
}

function confirmDelete(confirm) {
    if (confirm) {
        tasks = tasks.filter(task => task.id !== taskToDelete);
        saveTasksToLocalStorage();
        renderTasks();
    }
    closeModal();
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    document.getElementById('confirm-modal').style.display = 'none';
}


function clearInputFields() {
    document.getElementById('task-name').value = '';
    document.getElementById('due-date').value = '';
}

loadTasksFromLocalStorage();



