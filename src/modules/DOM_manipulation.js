import task from "./task.js";
import { AllProjects } from "./projects.js";

const formAddTask = document.querySelector("#add-task-form");
const TasksList = document.getElementById("tasks");

const title = document.querySelector("#title");
const date = document.querySelector("#date");
const priority = document.querySelector("#priority");

const projectInput = document.querySelector("#project-input");

let CurrentListName = "Home";

function AddNewTask() {
  if (title.value === "" || date.value === "" || priority.value === "") return;

  const newTask = new task(title.value, date.value, priority.value);
  const NOTADDED = AllProjects.addTaskToList(CurrentListName, newTask); // added == true if it's added , false otherwise
  addNewTaskToDom(NOTADDED, newTask);
  // console.log(JSON.stringify(AllProjects));
}

function AddNewProject() {
  if (projectInput.value === "") return;
  const NOTADDED = AllProjects.addList(projectInput.value);
  addNewProjectToDom(NOTADDED, projectInput.value);
}

function addNewTaskToDom(notAdded, newTask) {
  if (!notAdded) return;

  let Checked = "";
  let notActive = "";
  let Activestrike = "";

  if (newTask.isCompleted()) {
    Checked = "checked";
    notActive = "non-active-task";
    Activestrike = "active-strike";
  }

  const TasksList = document.getElementById("tasks");

  TasksList.innerHTML += `<div class="task ${newTask.getPriority()} ${notActive}">
                                <input type="checkbox" class="check-btn " ${Checked} >
                                <h3>${newTask.getTitle()}</h3>
                                <h4>${newTask.getDate()}</h4>
                                <div >
                                    <img src="./images/delete.png" id="del-task-icon">
                                </div>
                                <div  class="strike ${Activestrike}" ></div>
                            </div>`;
  const DelBtn = document.querySelectorAll("#del-task-icon");

  DelBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskTitle =
        btn.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      btn.parentElement.parentElement.remove();
      AllProjects.removeTask(CurrentListName, taskTitle);
      CurrentListName = "Home";
    });
  });

  const CheckBtn = document.querySelectorAll(".check-btn");

  CheckBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskTitle = btn.nextElementSibling.textContent;
      AllProjects.updateTask(CurrentListName, taskTitle);

      const strike =
        btn.nextElementSibling.nextElementSibling.nextElementSibling
          .nextElementSibling;
      strike.classList.toggle("active-strike");

      const TheTASK = btn.parentElement;
      TheTASK.classList.toggle("non-active-task");
    });
  });
}

function addNewProjectToDom(notAdded, projectName) {
  if (!notAdded) return;

  const DomProjects = document.querySelector("#projects");

  DomProjects.innerHTML += `<li class="project" id="${projectName}">
                                <div>${projectName}</div>
                                <div >
                                    <img src="./images/delete.png" id="del-project-icon">
                                </div>
                            </li>`;

  const DelprojectIcon = document.querySelectorAll("#del-project-icon");

  DelprojectIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      const projName = icon.parentElement.previousElementSibling.textContent;
      icon.parentElement.parentElement.remove();
      AllProjects.removeList(projName);
    });
  });

  const AllTheProjects = document.querySelectorAll(".project");

  AllTheProjects.forEach((project) => {
    project.addEventListener("click", () => {
      const projName = project.firstElementChild.textContent;
      renderTasks(projName);
      // AddActiveList(project);
    });
  });
}

function clearTasksFromDom() {
  TasksList.innerHTML = "";
}

function renderToday() {
  formAddTask.classList.add("hidden");
  clearTasksFromDom();
  const todayTasks = AllProjects.TodayList();
  todayTasks.forEach((tsk) => addNewTaskToDom(true, tsk));
}

function renderWeek() {
  formAddTask.classList.add("hidden");
  clearTasksFromDom();
  const UpCommingTasks = AllProjects.UpCommingTasks();
  UpCommingTasks.forEach((tsk) => addNewTaskToDom(true, tsk));
}

function renderTasks(ListName) {
  if (formAddTask.classList.contains("hidden"))
    formAddTask.classList.remove("hidden");

  clearTasksFromDom();
  const TheList = AllProjects.ListOfTheTasks(ListName);
  TheList.forEach((tsk) => addNewTaskToDom(true, tsk));
  CurrentListName = ListName;
}

export {
  AddNewTask,
  AddNewProject,
  renderTasks,
  renderToday,
  renderWeek,
  addNewTaskToDom,
  addNewProjectToDom,
};
