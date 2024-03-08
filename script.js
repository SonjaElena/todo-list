const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let uniqueIdCounter = 0;

const allRdio = document.getElementById("");
const doneRdio = document.getElementById("");
const openRdio = document.getElementById("");

// Add

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const listItems = Array.from(listContainer.getElementsByTagName("li"));
  const double = listItems.some(
    (item) =>
      item.textContent.trim().toLowerCase() ===
      inputBox.value.trim().toLowerCase()
  );

  if (inputBox.value === "" || double) {
    alert("Write a new to do to add to your list");
    return;
  }

  let li = document.createElement("li");
  let checkBox = document.createElement("input");

  li.setAttribute("id", "task-" + uniqueIdCounter++);
  li.setAttribute("statusDone", false);

  checkBox.type = "checkbox";

  li.appendChild(checkBox);
  li.appendChild(document.createTextNode(inputBox.value));

  listContainer.appendChild(li);

  inputBox.value = "";
  saveData();
}

// toggle checkboxen status
listContainer.addEventListener("click", function (event) {
  const target = event.target;
  if (target.tagName === "INPUT" && target.type === "checkbox") {
    const li = target.parentElement;
    li.classList.toggle("checked");
    li.setAttribute("statusDone", target.checked ? "true" : "false");
    saveData();
  }
});

// Delete checked
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
  const liEls = listContainer.getElementsByTagName("li");

  // es kann nur ein button ausgewählt werden.
  radioButtons.forEach((button) => {
    if (button !== checkbox) {
      button.checked = false;
    }
    const boxDone = checkbox.id === "doneCheckbox" ? true : false;
    const boxOpen = checkbox.id === "openCheckbox" ? true : false;

    for (let i = 0; i < liEls.length; i++) {
      const liEl = liEls[i];
      const statusDone = liEl.getAttribute("statusDone") === "true";

      if (boxDone && !statusDone) {
        liEl.style.display = "none";
      } else if (boxOpen && statusDone) {
        liEl.style.display = "none";
      } else {
        liEl.style.display = "block";
      }
    }

    saveData();
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
