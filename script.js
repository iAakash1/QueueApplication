// script.js
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const progressBar = document.getElementById('progress');
const progressPercentage = document.getElementById('progressPercentage');

let totalTasks = 0;
let completedTasks = 0;

// Simulate adding a task
document.getElementById('addTaskBtn').addEventListener('click', function() {
    const task = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const category = document.getElementById('category').value;

    if (task && description && dueDate && category) {
        totalTasks++;
        const li = document.createElement('li');
        li.innerHTML = `${task} <button class="completeBtn">Complete</button>`;
        taskList.appendChild(li);
        
        // Reset input fields
        document.getElementById('task').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dueDate').value = '';
        document.getElementById('category').value = '';

        updateProgress();

        // Add event listener for completion
        li.querySelector('.completeBtn').addEventListener('click', function() {
            li.remove();
            completedTasks++;
            updateProgress();
            viewCompletedTasks(task);
        });
    }
});

function viewCompletedTasks(task) {
    const li = document.createElement('li');
    li.textContent = task;
    completedTaskList.appendChild(li);
}

function updateProgress() {
    const progress = (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
}
