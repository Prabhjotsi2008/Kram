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

const inputTask = document.querySelector("#input-task")
// console.log(inputTask);

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