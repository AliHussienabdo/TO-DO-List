import { task } from "./task.js";
import List from "./list.js";
import {
  populateProjectsFromLocalStorage,
  updateLocalStorage,
} from "./LocalStorage.js";
import { format } from "date-fns";

class Projects {
  constructor() {
    this.projects = populateProjectsFromLocalStorage();
  }

  addList(ListName) {
    if (this.include(ListName)) return false;
    this.projects.push(new List(ListName));
    updateLocalStorage(this.projects);
    return true;
  }
  addTaskToList(ListName, newTask) {
    const index = this.findIndex(ListName);
    // return true if added otherwise false
    const addedBefore = this.projects[index].addTask(newTask);
    console.log(JSON.stringify(this.projects));
    updateLocalStorage(this.projects);
    return addedBefore;
  }
  removeTask(ListName, title) {
    const index = this.findIndex(ListName);
    this.projects[index].removeTask(title);
    updateLocalStorage(this.projects);
  }
  updateTask(ListName, title) {
    const index = this.findIndex(ListName);
    this.projects[index].updateTask(title);
    updateLocalStorage(this.projects);
  }
  removeList(ListName) {
    this.projects = this.projects.filter((list) => list.getName() != ListName);
    updateLocalStorage(this.projects);
  }
  findIndex(ListName) {
    const index = this.projects.findIndex((list) => list.getName() == ListName);
    return index;
  }
  include(ListName) {
    return this.projects.some((list) => list.getName() == ListName);
  }
  ListOfTheTasks(ListName) {
    const index = this.findIndex(ListName);
    return this.projects[index].getAllTasks();
  }
  TodayList() {
    let tasksToday = [];

    this.projects.forEach((list) => {
      list.tasksList.forEach((task) => {
        const date = new Date();

        let todayDate = format(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          "yyyy-MM-dd",
        );

        if (task.getDate() == todayDate) {
          tasksToday.push(task);
        }
      });
    });
    return tasksToday;
  }
  UpCommingTasks() {
    let tasksUpcomming = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      let todayDate = format(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
        "yyyy-MM-dd",
      );

      this.projects.forEach((list) => {
        list.tasksList.forEach((task) => {
          if (task.getDate() == todayDate) {
            tasksUpcomming.push(task);
          }
        });
      });
    }

    return tasksUpcomming;
  }
}

let AllProjects = new Projects();
// the default working directory
AllProjects.addList("Home");

export { AllProjects };
