// Initialize tasks arrays
let tasks = [];
let completedTasks = [];

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    // Clear existing tasks
    taskList.innerHTML = '';
    completedList.innerHTML = '';

    // Add current tasks to the list
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${task.task} - ${task.description} (Due: ${task.dueDate}) - <span class="category">${task.category}</span>`;
        taskList.appendChild(li);
    });

    // Add completed tasks to the list
    completedTasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        completedList.appendChild(li);
    });
}

// Handle form submission
document.getElementById("task-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const taskInput = document.getElementById("task").value;
    const descriptionInput = document.getElementById("description").value;
    const dueDateInput = document.getElementById("dueDate").value;
    const categoryInput = document.getElementById("category").value;

    const newTask = {
        task: taskInput,
        description: descriptionInput,
        dueDate: dueDateInput,
        category: categoryInput
    };

    tasks.push(newTask);
    displayTasks();

    // Clear the form inputs
    this.reset();
});

// Handle completing tasks
document.getElementById("completeButton").addEventListener("click", function() {
    const completeInput = document.getElementById("completeTask").value;
    const taskIndex = tasks.findIndex(t => t.task === completeInput);

    if (taskIndex !== -1) {
        completedTasks.push(`${tasks[taskIndex].task} - ${tasks[taskIndex].description} (Due: ${tasks[taskIndex].dueDate})`);
        tasks.splice(taskIndex, 1);
        displayTasks();
        document.getElementById("completeTask").value = ''; // Clear the input
    } else {
        alert("Task not found!");
    }
});
