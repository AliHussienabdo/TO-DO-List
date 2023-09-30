

export default class task{
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
