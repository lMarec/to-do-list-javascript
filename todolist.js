// This file contains JS functions related to a to do list 

// This function will clear the terminal screen
function clearTerminalScreen() {
    console.clear();
}

// This function will pause execution for a given number of seconds
function timesleep(seconds) {
    const start = Date.now();
    let now = null;
    do {
        now = Date.now();
    } while (now - start < seconds * 1000);
}

// initialise an empty array to hold the tasks
tasks = [];

function addTask(category,task) {
    tasks.push({category: category, task: task});
}

function deleteTask(category) {
    tasks = tasks.filter(task => task.category !== category);
}

function fetchTasks() {
    console.log(tasks);
}

// Initialise the menu variable
menu = 0;    

/* The following while loop will keep running 
until the user selects exactly the values of 
1, 2 or 3 from the prompt */
while (menu != 1 && menu != 2 && menu != 3 && menu != 4) { 
    menu = prompt("Select an option:\n1. Add Task\n2. Delete Task\n3. View Tasks\n4. Exit\n--> ");
    if (menu == 1) {
        category = prompt("Enter task category: ");
        task = prompt("Enter task description: ");
        addTask(category,task);
    } else if (menu == 2) {
        category = prompt("Enter task category to delete: ");
        deleteTask(category);
    } else if (menu == 3) {
        fetchTasks();
    } else if (menu == 4) {
        alert("Exiting the to-do list application.");
        timesleep(2);
        clearTerminalScreen();
        break;
    } else {
        alert("Invalid option. Please try again.");
        timesleep(2);
        clearTerminalScreen();
    }
}

