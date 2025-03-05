let tasks = [];
let taskToDelete = null;

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskName && dueDate) {
        const task = {
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

