import {format} from "date-fns"

class task{
    constructor(title,dueDate,priority){

        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
    }

    getTitle(){
        return this.title;
    }

    getDate(){
        return this.dueDate;
    }

    getPriority(){
        return this.priority;
    }

    updateDone(){
        this.done = (this.done)? false : true;
    }

    completed(){
        return this.done;
    }
    
}

class List {
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


class AllTheLists {
    constructor(){
        this.ListOfallTheLists = [];
    }
    addList(ListName){
        if(this.include(ListName)) return false;
        this.ListOfallTheLists.push(new List(ListName));
        return true;
    }
    addTaskToList(ListName,newTask){
        const index = this.findIndex(ListName);
        // return true if added otherwise false
        return this.ListOfallTheLists[index].addTask(newTask);
    }
    removeTask(ListName,title){
        const index = this.findIndex(ListName);
        this.ListOfallTheLists[index].removeTask(title);

    }
    updateTask(ListName, title){
        const index = this.findIndex(ListName);
        this.ListOfallTheLists[index].updateTask(title);
    }
    removeList(ListName){
        this.ListOfallTheLists = this.ListOfallTheLists.filter(list => list.getName() != ListName);
    }
    findIndex(ListName){
        const index = this.ListOfallTheLists.findIndex(list => list.getName() == ListName);
        return index;
    }
    include(ListName){
        return this.ListOfallTheLists.some(list => list.getName() == ListName);
    }
    ListOfTheTasks(ListName){
        const index = this.findIndex(ListName);
        return this.ListOfallTheLists[index].getAllTasks();
    }
    TodayList(){
        let tasksToday = [];

        this.ListOfallTheLists.forEach(list => {
            list.doList.forEach(task => {
                const date = new Date();

                let todayDate = format(new Date(date.getFullYear(), date.getMonth(), date.getDate()), 'yyyy-MM-dd');

                if(task.getDate() == todayDate){
                    tasksToday.push(task);
                }
            })
        })
        return tasksToday;
    }
    UpCommingTasks(){

        let tasksUpcomming = [];
        
        for(let i = 0; i < 7; i++){
            const date = new Date();
            let todayDate = format(new Date(date.getFullYear(), date.getMonth(), date.getDate()+i), 'yyyy-MM-dd');

            this.ListOfallTheLists.forEach(list => {
                list.doList.forEach(task => {
                    
                    if(task.getDate() == todayDate){
                        tasksUpcomming.push(task);
                    }
                })
            })

        }

        return tasksUpcomming;

    }
}


let allTheLists = new AllTheLists();
// the default working directory
allTheLists.addList('Home');

export  {task, allTheLists};


