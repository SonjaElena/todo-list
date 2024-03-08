const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add
function addTask() {
  const listItems = Array.from(
    document.getElementById("list-container").getElementsByTagName("li")
  );
  const double = listItems.some(
    (item) =>
      item.textContent.trim().toLowerCase() ===
      inputBox.value.trim().toLowerCase()
  );

  if (inputBox.value === "" || double) {
    alert("Write something down to add it to your list");
    return;
  }

  let li = document.createElement("li");
  let checkBox = document.createElement("input");

  checkBox.type = "checkbox";
  checkBox.addEventListener("click", function () {
    li.classList.toggle("checked");
    saveData();
  });

  li.appendChild(checkBox);
  li.appendChild(document.createTextNode(inputBox.value));

  listContainer.appendChild(li);

  inputBox.value = "";
  saveData();
}

// Delete die gecheckten
function removeTask() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkbox.parentElement.remove();
      saveData();
    }
  });
}

// Filter
function toggleFilter(checkbox) {
  const radioButtons = document.querySelectorAll('.filter input[type="radio"]');

  radioButtons.forEach((button) => {
    if (button !== checkbox) {
      button.checked = false;
    }
  });

  saveData();
}

// Storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
