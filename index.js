let todoinput = document.querySelector("#todo-input");
let doinginput = document.querySelector("#doing-input");
let doneinput = document.querySelector("#done-input");

let todos = document.getElementById("todos");
let doing = document.getElementById("doing");
let done = document.getElementById("done");
let editPopup = document.getElementById("editPopup");

let columns = document.querySelectorAll(".tasks");
let draggedcard = null;
let todoinputvalue = "",
  doinginputvalue = "",
  doneinputvalue = "";
let rightClickedTodoTask = null;

let todocount = document.getElementById("todocount"),
  doingcount = document.getElementById("doingcount"),
  donecount = document.getElementById("donecount");
todoinput.addEventListener("input", (event) => {
  todoinputvalue = event.target.value;
});
doinginput.addEventListener("input", (event) => {
  doinginputvalue = event.target.value;
});
doneinput.addEventListener("input", (event) => {
  doneinputvalue = event.target.value;
});

function handleEditMenu(event) {
  event.preventDefault();
  editPopup.style.display = "block";
  editPopup.style.left = `${event.pageX}px`;
  editPopup.style.top = `${event.pageY + 30}px`;
  rightClickedTodoTask = this;
}

document.addEventListener("click", () => {
  editPopup.style.display = "none";
});

function handleAddBtn(val) {
  let currentdatetime = new Date().toLocaleString();
  //let currentTimeDetails = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} on ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} ${date.getHours()>12?'Pm':'Am'}`
  let taskElem = document.createElement("div");
  taskElem.style =
    "color:white; padding:0.4vw; cursor:grab; color:black; border-radius:6px; background-color:rgb(160, 239, 220); margin-top:1vw; width:95%; margin-left:0.6vw";
  taskElem.setAttribute("draggable", true);
  taskElem.addEventListener("dragstart", handleDragstart);
  taskElem.addEventListener("dragend", handleDragend);
  taskElem.addEventListener("contextmenu", handleEditMenu);
  if (val === "done-input") {
    if (doneinputvalue.trim() === "") return;
    taskElem.innerHTML = `<h4>${doneinputvalue}</h4><br><small>${currentdatetime}</small>`; //textContent = doneinputvalue
    done.appendChild(taskElem);
    donecount.textContent = done.childElementCount;
    doneinput.value = "";
  } else if (val === "doing-input") {
    if (doinginputvalue.trim() === "") return;
    taskElem.innerHTML = `<h4>${doinginputvalue}</h4><br><small >${currentdatetime}</small>`; //textContent = doneinputvalue
    doing.appendChild(taskElem);
    doingcount.textContent = doing.childElementCount;
    doinginput.value = "";
  } else {
    if (todoinputvalue.trim() === "") return;
    taskElem.innerHTML = `<h4>${todoinputvalue}</h4><br><small>${currentdatetime}</small>`; //textContent = doneinputvalue
    todos.appendChild(taskElem);
    todocount.textContent = todos.childElementCount;
    todoinput.value = "";
  }
}

// let's handle tasks dragging feature dragstart, dragend, dragover

function handleDragstart() {
  this.classList.add("dragging");
  draggedcard = this;
}
function handleDragend() {
  this.classList.remove("dragging");
}

columns.forEach((val) => {
  val.addEventListener("dragover", handleDragover);
});
function handleDragover(event) {
  event.preventDefault();
  this.appendChild(draggedcard);
}

function handleEditbtn() {
  let currentdatetime = new Date().toLocaleString();
  if (rightClickedTodoTask !== null) {
    let updatedTask = prompt("Enter updated task");
    if (updatedTask.trim().length < 1) return;
    rightClickedTodoTask.innerHTML = `<h4>${updatedTask}</h4><br><small>${currentdatetime}</small>`;
  }
}

function handleDelbtn() {
  if (rightClickedTodoTask !== null) {
    rightClickedTodoTask.remove();
  }
}
