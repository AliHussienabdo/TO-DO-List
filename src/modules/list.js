import {task} from './task.js'

export class List {
    constructor(name){
        this.name = name;
        this.doList = [];
    }
    getName(){
        return this.name;
    }
    getAllTasks(){
        return this.doList;
    }
    addTask(newTask){
        if(this.include(newTask.getTitle())) return false;
        this.doList.push(newTask);
        return true;
    }
    removeTask(title){ 
        this.doList = this.doList.filter(cell => cell.getTitle() != title);
        console.log()
    }
    updateTask(title){
        const index = this.doList.findIndex(cell => cell.getTitle() == title);
        this.doList[index].updateDone();
    }
    include(title){
        return this.doList.some(cell => cell.getTitle() == title);
    }
}



