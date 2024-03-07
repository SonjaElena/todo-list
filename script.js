const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Write your todo down");
    return;
  }

  let li = document.createElement("li");
  li.textContent = inputBox.value;

  listContainer.appendChild(li);

  inputBox.value = "";
  saveData();
}

// span.addEventListener("click", () => li.remove()); // Event-Listener für Löschen

// listContainer.addEventListener(
//   "click",
//   function (e) {
//     if (e.target.tagName === "LI") {
//       e.target.classList.toggle("checked"); // Wenn auf das Li Objekt gerschrieben wird, dann wird es gechecked
//       saveData();
//     } else if (e.target.tagName === "SPAN") {
//       e.target.parentElement.remove(); // Wenn auf das Kreuz gedrückt wird, dann wird das Element gelöscht
//       saveData();
//     }
//   },
//   false
// );

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
