document.addEventListener("DOMContentLoaded", loadTasks);

setInterval(()=>{
    document.getElementById('clock').innerText = new Date().toLocaleDateString();
}, 1000);


// Load task from Local Storage

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks(tasks);
}

// add new task
function addTask(){
    let title = document.getElementById("textTitle").value.trim();
    let desc = document.getElementById('taskDescription').value.trim();
    let Priority = document.getElementById('taskPriorty').value;

    if(!title){
        alert("Please enter a title");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({title, desc, Priority, completed:false, timestamp:Date.now()})
   localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("task Added", tasks);
    displayTasks(tasks);

   document.getElementById("taskTitle").value="";
   document.getElementById("taskDescription").value="";

   //displayTasks(tasks);
}

// Display Task

function displayTasks(tasks){
    let taskList = document.getElementById('taskList');
    taskList.innerHTML="";

    let now=Date.now();

    tasks.forEach((task, index) =>{
        let taskItem = document.createElement("li");
        taskItem.className=`task ${task.completed ? "completed":""}`;


        if(now = task.timestamp>300000) 
            taskItem.classList.add("expired");
        
        taskItem.innerHTML=
        `
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${index})">
        <span>${task.title} (${task.Priority})</span>
        <button onclick="deleteTask(${index})">X</button>
        
        `;
        taskList.appendChild(taskItem);
    });

    // Remove expired task
    let updateTask = tasks.filter(task=>now - task.timestamp<=300000);
    localStorage.setItem("tasks", JSON.stringify(updateTask));
}

// Task completeion Toggle
function toggleComplete(index){
    let tasks =  JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);

}

// Delete Tasks

function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);
}

// filter tasks by priority
function filterTaskS(){
    let priority = document.getElementById("priority").value;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if(priority !== "All"){
        tasks = tasks.filter(task=>task.priority === priority);
    }
    displayTasks(tasks)
}

// Sort
function sortTasks(type){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if(type == "priority"){
        let orders={"High":1, "Medium":2, "low":3};
        tasks.sort((a,b)=>orders[a.priority]- orders[b.priority]);
    }else if(type == "title"){
        tasks.sort((a,b)=>a.title.localeCompare(b.title));
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);
}

// remove expired task
setInterval(()=>{
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task=>Date.now()-task.timestamp<=300000 )
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks)
}, 30000)