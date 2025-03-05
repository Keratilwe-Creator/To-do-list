function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;

    if (!task) {
        alert('Task is required');
        return;
    }

    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task added:', data);
        // Optionally, update the UI with the new task
    })
    .catch(error => {
        console.error('Error adding task:', error);
    });
}
