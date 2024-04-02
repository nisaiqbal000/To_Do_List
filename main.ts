#! /usr/bin/env node
import inquirer from 'inquirer';

// Initialize an empty array to store todos
let todos = [];
// Initialize a boolean variable to control the loop
let condition = true;

// Main loop to add and manage todos
while (condition) {
    // Prompt the user to add a task
    let addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What do you want to add in your todos?",
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more?",
            default: false,
        },
    ]);

    // Add the new task to the todos array
    todos.push(addTask.todo);
    // Update the condition based on the user's choice to continue adding tasks
    condition = addTask.addMore;
    // Display the updated todos array
    console.log("Updated todos:", todos);

    // Check if the user wants to delete a task
    if (!condition) {
        // Prompt the user to confirm if they want to delete a task
        let deleteTask = await inquirer.prompt({
            name: "delete",
            type: "confirm",
            message: "Do you want to delete a task?",
            default: false,
        });

        // If the user confirms they want to delete a task
        if (deleteTask.delete) {
            // Prompt the user to enter the index of the task they want to delete
            let indexToDelete = await inquirer.prompt({
                name: "index",
                type: "input",
                message: "Enter the index of the task you want to delete:",
                validate: function(input) {
                    let index = parseInt(input);
                    // Validate the input index to ensure it's a valid number within the range of todos array
                    if (isNaN(index) || index < 1 || index > todos.length) {
                        return `Please enter a valid index between 1 and ${todos.length}`;
                    }
                    return true;
                },
            });

            // Remove the task at the specified index from the todos array
            todos.splice(indexToDelete.index - 1, 1);
            // Display the updated todos array
            console.log("Updated todos:", todos);
        }
    }
}
