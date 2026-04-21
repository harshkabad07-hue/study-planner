const tasks = [
  {
    name: "Solve Physics numericals",
    subject: "Physics",
    time: "4:30 PM",
    completed: false
  },
  {
    name: "Revise integration formulas",
    subject: "Maths",
    time: "6:00 PM",
    completed: true
  },
  {
    name: "Organic chemistry notes",
    subject: "Chemistry",
    time: "7:15 PM",
    completed: false
  },
  {
    name: "English essay outline",
    subject: "English",
    time: "8:00 PM",
    completed: false
  }
];

const taskList = document.getElementById("taskList");
const subjectFilter = document.getElementById("subjectFilter");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const addTaskBtn = document.getElementById("addTaskBtn");
const closeModal = document.getElementById("closeModal");
const timerDisplay = document.getElementById("timer");
const startTimer = document.getElementById("startTimer");
const resetTimer = document.getElementById("resetTimer");

const subjectClasses = {
  Physics: "physics",
  Maths: "math",
  Chemistry: "chemistry",
  English: "english"
};

function renderTasks() {
  const selectedSubject = subjectFilter.value;
  const visibleTasks = tasks.filter((task) => {
    return selectedSubject === "all" || task.subject === selectedSubject;
  });

  taskList.innerHTML = "";

  visibleTasks.forEach((task) => {
    const taskItem = document.createElement("article");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const content = document.createElement("div");
    content.innerHTML = `
      <span class="task-title">${task.name}</span>
      <span class="task-meta">${task.subject} | ${task.time}</span>
    `;

    const pill = document.createElement("span");
    pill.className = `task-pill ${subjectClasses[task.subject]}`;
    pill.textContent = task.subject;

    taskItem.append(checkbox, content, pill);
    taskList.appendChild(taskItem);
  });
}

function openTaskModal() {
  taskModal.classList.add("show");
  taskModal.setAttribute("aria-hidden", "false");
  document.getElementById("taskName").focus();
}

function closeTaskModal() {
  taskModal.classList.remove("show");
  taskModal.setAttribute("aria-hidden", "true");
  taskForm.reset();
}

addTaskBtn.addEventListener("click", openTaskModal);
closeModal.addEventListener("click", closeTaskModal);
subjectFilter.addEventListener("change", renderTasks);

taskModal.addEventListener("click", (event) => {
  if (event.target === taskModal) {
    closeTaskModal();
  }
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  tasks.unshift({
    name: document.getElementById("taskName").value.trim(),
    subject: document.getElementById("taskSubject").value,
    time: document.getElementById("taskTime").value.trim(),
    completed: false
  });

  closeTaskModal();
  renderTasks();
});

let timerSeconds = 25 * 60;
let timerInterval = null;

function updateTimer() {
  const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
  const seconds = (timerSeconds % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

startTimer.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startTimer.textContent = "Start";
    return;
  }

  startTimer.textContent = "Pause";
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds -= 1;
      updateTimer();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      startTimer.textContent = "Start";
    }
  }, 1000);
});

resetTimer.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 25 * 60;
  startTimer.textContent = "Start";
  updateTimer();
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  });
});

renderTasks();
updateTimer();
