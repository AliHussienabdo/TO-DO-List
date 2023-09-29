import {AddNewTask , AddNewProject, renderTasks, renderToday, renderWeek} from "./modules/DOMThings";

const addTaskBtn = document.querySelector('#add-btn');
const addProjectBtn = document.querySelector('#add-project-btn');

const HomeList = document.querySelector('#home');
const todayList = document.querySelector('#today');
const weekList = document.querySelector('#week');

const menuIcon = document.querySelector('#menu');
const sideBar = document.querySelector('.side-bar');

menuIcon.addEventListener('click', () =>{
    sideBar.classList.toggle('hidden');
    document.querySelector('main').classList.toggle('full-screen');
})

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    AddNewTask();
});

addProjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    AddNewProject();
});

HomeList.addEventListener('click', (e) => {
    renderTasks('Home');
});

todayList.addEventListener('click', (e) => {
    renderToday();
});

weekList.addEventListener('click', (e) => {
    console.log('week listener works fine bro :)');
    renderWeek();
});
