import {task} from './task.js'

export class List {
    constructor(name){
        this.name = name;
        this.tasksList = [];
    }
    getName(){
        return this.name;
    }
    getAllTasks(){
        return this.tasksList;
    }
    addTask(newTask){
        if(this.include(newTask.getTitle())) return false;
        this.tasksList.push(newTask);
        return true;
    }
    removeTask(title){ 
        this.tasksList = this.tasksList.filter(cell => cell.getTitle() != title);
    }
    updateTask(title){
        const index = this.tasksList.findIndex(cell => cell.getTitle() == title);
        this.tasksList[index].updateCompleted();
    }
    include(title){
        return this.tasksList.some(cell => cell.getTitle() == title);
    }
}



