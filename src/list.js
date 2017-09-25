export default class List {
    todos = [];
    constructor(name) {
        this.name = name;
    }

    getActive() {
        return todos.filter(t => !t.dateCompleted)
    }
}