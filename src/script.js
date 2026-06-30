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

// Function to style the taskText
function styler(taskText){
    if (taskText.contentEditable === "true"){
        taskText.classList.add("outline-none","border-b-2","border-amber-200");
        // taskText.textContent = "";
        // taskText.setAttribute("placeholder","Update Task...");
    }
    else{
        taskText.classList.remove("outline-none","border-b-2","border-amber-200");
        // taskText.removeAttribute("placeholder");
    }
}

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

    // taskText.addEventListener("keypress",(e) => {
    //     if (e.key==="Enter"){
    //         e.preventDefault();
    //         taskText.contentEditable = taskText.contentEditable === "true" ? "false" : "true";
    //         styler(taskText);
    //     }
    // })

    // Creating Edit Button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn", "border-2", "border-slate-600", "bg-blue-600", "text-gray-100", "p-2", "rounded-full", "hover:border-gray-100", "active:border-slate-600", "flex", "justify-center", "items-center", "text-lg");
    editBtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    task.appendChild(editBtn);

    // editBtn.addEventListener("click", () => {
    //         taskText.contentEditable = "true";
    //         taskText.focus();
    //         styler(taskText);
    // });

    // Creating Edit Button
    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn", "border-2", "border-slate-600", "bg-green-600", "text-gray-100", "p-2", "rounded-full", "hover:border-gray-100", "active:border-slate-600", "flex", "justify-center", "items-center", "text-xl");
    delBtn.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;

    // AAM ZINDAGI
    // delBtn.addEventListener("click", () => {
    //     delBtn.parentElement.remove();
    //     console.log(`Removed Task: ${delBtn.parentElement.firstChild.textContent}`);
    // });

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


// Better way using event delegation
taskCont.addEventListener("click", (e) => {
    // Function to delete task
    if(e.target.classList.contains("del-btn") || e.target.classList.contains("fa-circle-check")){
        const task = e.target.closest(".task"); 
        // const task = e.target.parentElement; // Less secure as it might delete the del-btn if icon is clicked
        task.remove();
        toggler();
    }

    // Function for edit button
    else if (e.target.classList.contains("edit-btn") || e.target.classList.contains("fa-pencil")){
        const textVal = e.target.closest(".task").firstChild;
        console.log(textVal);
        textVal.contentEditable = "true";
        textVal.focus();
        styler(textVal);
    }
});


// Function to confirm edit using ENTER key
taskCont.addEventListener("keypress",(e) => {
    if (e.target.classList.contains("task-text")){
        if (e.key==="Enter"){
            e.preventDefault();
            const textVal = e.target;
            // console.log(textVal);
            textVal.contentEditable = textVal.contentEditable === "false" ? "true" : "false";
            styler(textVal);
        }
    }
});