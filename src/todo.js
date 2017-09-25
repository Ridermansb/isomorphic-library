export default class Todo {
    constructor(title) {
        this.title = title;
    }

    complete() {
        this.dateCompleted = new Date()
    }
    uncomplete() {
        this.dateCompleted = undefined;
    }
}