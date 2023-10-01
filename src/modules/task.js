

export class task{
    constructor(title,dueDate,priority, completed = false) {

        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
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

    updateCompleted(){
        this.completed = (this.completed)? false : true;
    }

    isCompleted(){
        return this.completed;
    }
    
}
