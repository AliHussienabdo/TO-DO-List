
import {task,allTheLists} from './to-doClass.js';

const formAddTask = document.querySelector('#add-task-form');

const TasksList = document.getElementById('tasks');
const title = document.querySelector('#title');
const date = document.querySelector('#date');
const priority = document.querySelector('#priority');

const projectInput = document.querySelector('#project-input');
const DomProjects = document.querySelector('#projects');
const DomLists = document.querySelector('#lists');

const HomeList = document.querySelector('#home');

let CurrentListName = 'Home';

function AddNewTask() {
    if(title.value == '' || date.value == '' || priority.value == '') return;
    // const DateValue = date.valueAsDate;
    // console.log(date.value + ' ,' + DateValue );
    const DATE = new Date(date.value);
    console.log(DATE);
    const newTask = new task(title.value, date.value, priority.value);
    const ADDED = allTheLists.addTaskToList(CurrentListName,newTask); // added == true if it's added , false otherwise
    addNewTaskToDom(ADDED, newTask);
}


function AddNewProject() {
    if(projectInput.value == '') return;
    const ADDED = allTheLists.addList(projectInput.value);
    addNewProjectToDom(ADDED, projectInput.value);
}

function addNewTaskToDom(added,newTask){
    console.log(newTask.title + added);
    if(!added) return;

    let Checked = '';
    let notActive = '';
    let Activestrike = '';

    if(newTask.completed()){
        Checked = "checked";
        notActive = 'non-active-task';
        Activestrike = 'active-strike';
    }



    TasksList.innerHTML += `<div class="task ${newTask.getPriority()} ${notActive}">
                                <input type="checkbox" class="check-btn " ${Checked} >
                                <h3>${newTask.getTitle()}</h3>
                                <h4>${newTask.getDate()}</h4>
                                <div >
                                    <img src="./images/delete.png" id="del-task-icon">
                                </div>
                                <div  class="strike ${Activestrike}" ></div>
                            </div>`;    
    const DelBtn = document.querySelectorAll('#del-task-icon');
    

    DelBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskTitle = btn.parentElement.previousElementSibling.previousElementSibling.textContent;
            btn.parentElement.parentElement.remove();
            allTheLists.removeTask(CurrentListName, taskTitle);
            CurrentListName = 'Home';
            // HomeList.click();
        })
    });

    const CheckBtn = document.querySelectorAll('.check-btn');
    

    CheckBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskTitle = btn.nextElementSibling.textContent;
            allTheLists.updateTask(CurrentListName, taskTitle);

            const strike = btn.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
            strike.classList.toggle('active-strike');

            const TheTASK = btn.parentElement;
            TheTASK.classList.toggle('non-active-task');

        });
    });
}

function addNewProjectToDom(added, projectName){
    if(!added) return;

    DomProjects.innerHTML += `<li class="project" id="${projectName}">
                                <div>${projectName}</div>
                                <div >
                                    <img src="./images/delete.png" id="del-project-icon">
                                </div>
                            </li>`;

    const DelprojectIcon = document.querySelectorAll('#del-project-icon');

    DelprojectIcon.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const projName = icon.parentElement.previousElementSibling.textContent;
            icon.parentElement.parentElement.remove();
            allTheLists.removeList(projName);
            
        })
    });

    const AllTheProjects = document.querySelectorAll('.project');

    AllTheProjects.forEach(project => {
        project.addEventListener('click', (e) => {
            const projectName = project.firstElementChild.textContent;
            renderTasks(projectName);
        })
    });
}

function renderToday(){
    formAddTask.classList.add('hidden');
    clearTasksFromDom();
    const todayTasks = allTheLists.TodayList();
    todayTasks.forEach(task => addNewTaskToDom(true, task));
}

function renderWeek(){
    formAddTask.classList.add('hidden');
    clearTasksFromDom();
    const UpCommingTasks = allTheLists.UpCommingTasks();
    UpCommingTasks.forEach(task => addNewTaskToDom(true, task));
}

function renderTasks(ListName) {
    if(formAddTask.classList.contains('hidden')) formAddTask.classList.remove('hidden');
    
    clearTasksFromDom();
    const TheList = allTheLists.ListOfTheTasks(ListName);
    TheList.forEach(task => addNewTaskToDom(true, task));
    CurrentListName = ListName;
}

function clearTasksFromDom(){
    TasksList.innerHTML = '';
}


export {AddNewTask, AddNewProject, renderTasks, renderToday, renderWeek};