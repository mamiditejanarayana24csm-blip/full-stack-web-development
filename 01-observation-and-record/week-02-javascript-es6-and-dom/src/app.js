// ---------- DOM manipulation ----------
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const addTask = () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => li.classList.toggle("done"));

  const del = document.createElement("button");
  del.textContent = "x";
  del.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(del);
  taskList.appendChild(li);
  input.value = "";
};

addBtn.addEventListener("click", addTask);

// ---------- Async / fetch ----------
const loadBtn = document.getElementById("loadBtn");
const userList = document.getElementById("userList");

async function loadUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const users = await res.json();
    userList.innerHTML = users
      .map(({ name, email }) => `<li>${name} - ${email}</li>`)
      .join("");
  } catch (err) {
    userList.innerHTML = `<li>Error: ${err.message}</li>`;
  }
}

loadBtn.addEventListener("click", loadUsers);
