const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  addTodo(inputAdd.value, false);

  inputAdd.value = "";
  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here
  //append todo to HTML...
  //define buttons event..
  if (completed === true) {
    span.style.textDecoration = "line-through";
  }

  if (span.innerText === "" || !span.innerText.replace(/\s/g, "").length) {
    alert("Todo cannot be empty");
  } else {
    div.appendChild(span);
    div.appendChild(doneBtn);
    div.appendChild(deleteBtn);
    todoCtn.prepend(div);
    div.onmouseover = (event) => {
      doneBtn.style.display = "";
      deleteBtn.style.display = "";
    };
    div.onmouseout = (event) => {
      doneBtn.style.display = "none";
      deleteBtn.style.display = "none";
    };
  }

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through")
      span.style.textDecoration = "";
    else span.style.textDecoration = "line-through";
    saveTodo();
  };
  deleteBtn.onclick = () => {
    div.removeChild(span);
    div.removeChild(doneBtn);
    div.removeChild(deleteBtn);
    div.remove();
    saveTodo();
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
  }
  //your code here
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todoListData", dataStr);
}

function loadTodo() {
  const dataStr = localStorage.getItem("todoListData");
  const data = JSON.parse(dataStr);
  console.log(data);
  for (let i = data.length - 1; i >= 0; i--) {
    addTodo(data[i].title, data[i].completed);
  }
}

loadTodo();
