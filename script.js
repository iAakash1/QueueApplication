class Node {
    constructor(task, description, dueDate, category) {
        this.task = task;
        this.description = description;
        this.dueDate = dueDate;
        this.category = category;
        this.isComplete = false;
        this.next = null;
    }
}

class CompletedNode {
    constructor(task, description, dueDate, category) {
        this.task = task;
        this.description = description;
        this.dueDate = dueDate;
        this.category = category;
        this.next = null;
    }
}

class TaskQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.completedHead = null;
        this.completedCount = 0;
        this.totalCount = 0; // Track the total number of tasks
    }

    isEmpty() {
        return this.front === null;
    }

    // Add task
    enqueue(task, description, dueDate, category) {
        const newNode = new Node(task, description, dueDate, category);
        this.totalCount++; // Increment total count

        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            let current = this.front;
            let prev = null;

            // Insert based on due date
            while (current !== null && current.dueDate <= newNode.dueDate) {
                prev = current;
                current = current.next;
            }

            if (prev === null) {
                newNode.next = this.front;
                this.front = newNode;
            } else {
                newNode.next = current;
                prev.next = newNode;

                if (current === null) this.rear = newNode;
            }
        }
    }

    // Remove the highest priority task
    dequeueHighestPriority() {
        if (this.isEmpty()) return null;

        const temp = this.front;
        this.front = this.front.next;
        this.totalCount--; // Decrement total count
        if (this.front === null) this.rear = null;
        return temp;
    }

    // Mark a task as complete
    markComplete(taskName) {
        let curr = this.front;
        let prev = null;

        while (curr !== null) {
            if (curr.task === taskName) {
                const completedTask = new CompletedNode(curr.task, curr.description, curr.dueDate, curr.category);
                this.completedCount++;
                completedTask.next = this.completedHead;
                this.completedHead = completedTask;

                // Remove from queue
                if (prev === null) {
                    this.front = curr.next;
                } else {
                    prev.next = curr.next;
                }

                if (this.front === null) this.rear = null;
                return;
            }
            prev = curr;
            curr = curr.next;
        }
    }

    // Undo a completed task
    undoCompleted() {
        if (this.completedHead === null) return;

        const temp = this.completedHead;
        this.completedHead = this.completedHead.next;
        this.enqueue(temp.task, temp.description, temp.dueDate, temp.category);
        this.completedCount--;
    }

    // View all tasks
    viewTasks() {
        const tasks = [];
        let curr = this.front;
        while (curr !== null) {
            tasks.push(curr);
            curr = curr.next;
        }
        return tasks;
    }

    // View completed tasks
    viewCompletedTasks() {
        const tasks = [];
        let curr = this.completedHead;
        while (curr !== null) {
            tasks.push(curr);
            curr = curr.next;
        }
        return tasks;
    }

    // Show progress
    showProgress() {
        const totalTasks = this.totalCount;
        return (totalTasks === 0) ? 0.0 : (this.completedCount / totalTasks) * 100;
    }

    // Clear all tasks
    clearAllTasks() {
        while (!this.isEmpty()) this.dequeueHighestPriority();
    }
}

// Instantiate TaskQueue
const queue = new TaskQueue();

// DOM Elements
const addTaskBtn = document.getElementById('addTaskBtn');
const viewTasksBtn = document.getElementById('viewTasksBtn');
const viewCompletedBtn = document.getElementById('viewCompletedBtn');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const showProgressBtn = document.getElementById('showProgressBtn');
const tasksContainer = document.getElementById('tasksContainer');
const completedTasksContainer = document.getElementById('completedTasksContainer');

// Event Listeners
addTaskBtn.addEventListener('click', () => {
    const task = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const category = document.getElementById('category').value;

    if (task && description && dueDate && category) {
        queue.enqueue(task, description, dueDate, category);
        document.getElementById('task').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dueDate').value = '';
        document.getElementById('category').value = '';
        alert(`Task "${task}" added successfully.`);
    }
});

viewTasksBtn.addEventListener('click', () => {
    tasksContainer.innerHTML = '<h2>Current Tasks</h2>';
    const tasks = queue.viewTasks();
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `<h3>${task.task}</h3>
            <p>Description: ${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Category: ${task.category}</p>
            <button onclick="completeTask('${task.task}')">Complete</button>`;
        tasksContainer.appendChild(taskElement);
    });
});

viewCompletedBtn.addEventListener('click', () => {
    completedTasksContainer.innerHTML = '<h2>Completed Tasks</h2>';
    const tasks = queue.viewCompletedTasks();
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task completed-task';
        taskElement.innerHTML = `<h3>${task.task}</h3>
            <p>Description: ${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Category: ${task.category}</p>`;
        completedTasksContainer.appendChild(taskElement);
    });
});

clearTasksBtn.addEventListener('click', () => {
    queue.clearAllTasks();
    alert('All tasks cleared.');
});

showProgressBtn.addEventListener('click', () => {
    const progress = queue.showProgress();
    alert(`Progress: ${progress.toFixed(2)}%`);
});

// Complete a task
function completeTask(taskName) {
    queue.markComplete(taskName);
    alert(`Task "${taskName}" marked as complete.`);
}
