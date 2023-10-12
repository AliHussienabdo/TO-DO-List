// we first store "projects" item in local-storage we can get him here
// in json.stringified format se we can make lists and push them back
// to AllTheProjects...

import List from './list.js';
import task from './task.js';
// eslint-disable-next-line linebreak-style
import { addNewTaskToDom, addNewProjectToDom } from './DOM_manipulation.js';

function updateLocalStorage(projects) {
  localStorage.removeItem('projects');
  localStorage.setItem('projects', JSON.stringify(projects));
}

function populateProjectsFromLocalStorage() {
  if (localStorage.getItem('projects') == null) {
    console.log('not exist');
    localStorage.setItem('projects', []);
    return [];
  }

  const TheProjects = JSON.parse(localStorage.getItem('projects'));

  const allTheProjects = [];
  TheProjects.forEach((project) => {
    const list = new List(project.name);

    if (list.name !== 'Home') {
      addNewProjectToDom(true, project.name);
    }

    project.tasksList.forEach((tsk) => {
      const TASK = new task(
        tsk.title,
        tsk.dueDate,
        tsk.priority,
        tsk.completed,
      );
      list.addTask(TASK);
      if (list.name === 'Home') {
        addNewTaskToDom(true, TASK);
      }
    });
    allTheProjects.push(list);
  });
  return allTheProjects;
}

export { populateProjectsFromLocalStorage, updateLocalStorage };
