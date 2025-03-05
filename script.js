// Define the API URL for backend communication
const apiUrl = process.env.API_URL || 'http://localhost:3000/todos';  // Default to localhost if not provided

// Function to display tasks
function displayTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';  // Clear current task list

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;

        // Add a delete button to each task
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task._id);  // MongoDB uses _id instead of id

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-name');
    const taskName = taskInput.value.trim();  // Trim spaces to avoid empty tasks

    console.log('Task name:', taskName);

    if (!taskName) {
        alert('Please enter a valid task!');
        return;  // Do nothing if task input is empty
    }

    const taskData = {
        task: taskName,
    };

    console.log('Task data:', taskData);

    // Send a POST request to add a new task
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('New Task Added:', data);
        loadTasks();  // Reload the tasks after adding
    })
    .catch(error => console.error('Error:', error));

    taskInput.value = '';  // Clear the input field after task is added
}

// Function to load tasks from the backend
function loadTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => console.error('Error:', error));
}

// Function to delete a task
function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        loadTasks();  // Reload the tasks after deleting
    })
    .catch(error => console.error('Error:', error));
}

// Event listener to add task when button is clicked
document.getElementById('addButton').addEventListener('click', () => {
    console.log('Add button clicked');
    addTask();
});






