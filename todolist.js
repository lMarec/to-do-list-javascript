// This file is a JavaScript file intended to manage a simple to-do list application with node.js

// This module allows us to take input from the user via the terminal for node.js
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const rl = readline;

// Promisify readline.question for async/await usage
function question(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

// This function will clear the terminal screen
function clearTerminalScreen() {
    console.clear();
}

// This function will pause execution for a given number of milliseconds
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Initialize an empty array to hold the tasks
const tasks = [];

function addTask(category, task) {
    tasks.push({ category: category, task: task });
}

function deleteTask(category) {
    const initialLength = tasks.length;
    const filtered = tasks.filter(t => t.category !== category);
    tasks.length = 0;
    tasks.push(...filtered);
    
    if (filtered.length === initialLength) {
        console.log(`No tasks found with category: ${category}`);
    } else {
        console.log(`Deleted task(s) from category: ${category}`);
    }
}

async function fetchTasks() {
    if (tasks.length === 0) {
        console.log("No tasks to display.");
    } else {
        console.log("\n--- Your Tasks ---");
        tasks.forEach((t, index) => {
            console.log(`${index + 1}. [${t.category}] ${t.task}`);
        });
        console.log("------------------\n");
    }
    
    await question("Press Enter to continue...");
    clearTerminalScreen();
}

// Main application loop
async function main() {
    let continueApp = true;
    
    while (continueApp) {
        let menu = await question("Select an option:\n1. Add Task\n2. Delete Task\n3. View Tasks\n4. Exit\n--> ");
        
        switch (menu) {
            case "1":
                const category = await question("Enter task category: ");
                const task = await question("Enter task description: ");
                addTask(category, task);
                console.log("Task added successfully!");
                await sleep(1000);
                clearTerminalScreen();
                break;
                
            case "2":
                const categoryToDelete = await question("Enter task category to delete: ");
                deleteTask(categoryToDelete);
                await sleep(1000);
                clearTerminalScreen();
                break;
                
            case "3":
                await fetchTasks();
                break;
                
            case "4":
                console.log("Exiting the to-do list application.");
                await sleep(1000);
                clearTerminalScreen();
                continueApp = false;
                rl.close();
                break;
                
            default:
                console.log("Invalid option. Please try again.");
                await sleep(1000);
                clearTerminalScreen();
        }
    }
}

// Start the application
main();

