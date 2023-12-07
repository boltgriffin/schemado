function addTask() {
  var taskInput = document.getElementById("task-input");
  var taskList = document.getElementById("task-list");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  var li = document.createElement("li");
  li.innerHTML = `
      <span>${taskInput.value}</span>
      <div class="actions">
          <div class="edit-icon" onclick="editTask(this)"></div>
          <div class="delete-icon" onclick="deleteTask(this)"></div>
      </div>
  `;

  taskList.appendChild(li);
  taskInput.value = "";
}

function deleteTask(icon) {
  var li = icon.parentNode.parentNode;
  li.parentNode.removeChild(li);
}

function editTask(icon) {
  var li = icon.parentNode.parentNode;
  var span = li.querySelector("span");

  // Create an input field
  var input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;

  // Replace the span with the input
  li.replaceChild(input, span);

  // Change the edit icon to a save icon
  icon.className = "save-icon";
  icon.onclick = function () {
    // Validate input value
    var editedTask = input.value.trim();
    if (editedTask === "") {
      alert("Please enter a non-empty task!");
      return;
    }

    // Save the edited task
    span.textContent = editedTask;

    // Restore the original UI (span and edit icon)
    li.replaceChild(span, input);
    icon.className = "edit-icon";
    icon.onclick = function () {
      editTask(this);
    };
  };
}
