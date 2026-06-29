const placeholders = [
    "Go to Gym...",
    "Meeting at 5 PM...",
    "Buy Groceries...",
    "Complete Assignment...",
    "Read 20 Pages...",
    "Pay Electricity Bill...",
    "Water the Plants...",
    "Plan Weekend Trip...",
    "Revise Today's Notes...",
];

let inputTask = document.querySelector("#input-task");
const addBtn = document.querySelector("#add-btn");
const taskCont = document.querySelector(".tasks-cont");
const emptyCont = document.querySelector(".empty-cont");

let previous = -1;  // Previous index

setInterval(() => {
    let randIdx;

    // Keeps generating random index until it is same as previous
    do {
        randIdx = Math.floor(Math.random() * placeholders.length);
    } while (previous === randIdx);
    previous = randIdx;
    // console.log(randIdx);
    inputTask.placeholder = placeholders[randIdx];
}, 2500);


// Function to toggle empty container
const toggler = () => {
    if (taskCont.childElementCount){
        emptyCont.classList.remove("flex");
        emptyCont.classList.add("hidden");
    }
    else{
        emptyCont.classList.remove("hidden");
        emptyCont.classList.add("flex");
    }
    // console.log(emptyCont.classList);
}

// toggler();

// Function to add new task
function addTask(t){
    // Creating a task div
    const task = document.createElement("div");
    task.classList.add("task", "flex", "items-center", "justify-center", "gap-2", "md:gap-4", "border-2", "border-slate-600", "bg-slate-800", "px-2", "md:px-4", "py-2", "w-full", "rounded-md");

    // Creating task-text
    const taskText = document.createElement("p");
    taskText.classList.add("task-text", "w-full", "text-lg");
    taskText.appendChild(document.createTextNode(t));
    task.appendChild(taskText);

    // Creating Edit Button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn", "border-2", "border-slate-600", "bg-blue-600", "text-gray-100", "p-2", "rounded-full", "hover:border-gray-100", "active:border-slate-600", "flex", "justify-center", "items-center", "text-lg");
    editBtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    task.appendChild(editBtn);

    // Creating Edit Button
    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn", "border-2", "border-slate-600", "bg-green-600", "text-gray-100", "p-2", "rounded-full", "hover:border-gray-100", "active:border-slate-600", "flex", "justify-center", "items-center", "text-xl");
    delBtn.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
    task.appendChild(delBtn);

    // Adding the main container to task container
    taskCont.appendChild(task);
}

// addTask("Go to Gym");

// Event Listener for Add Button
addBtn.addEventListener("click", () => {
    const taskVal = inputTask.value.trim();
    if(taskVal){
        addTask(taskVal);
        inputTask.value = "";
        toggler();
    }
});

inputTask.addEventListener("keypress",(e) => {
    if (e.key==="Enter"){
        const taskVal = inputTask.value.trim();
        if (taskVal){
            addTask(taskVal);
            inputTask.value = "";
            toggler();
        }
        }
});