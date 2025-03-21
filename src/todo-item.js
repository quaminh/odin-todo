export default class TodoItem {
    #completed = false;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    isCompleted() {
        return this.#completed;
    }

    toggleCompleted() {
        this.#completed = !this.#completed;
    }
}