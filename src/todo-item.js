export default class TodoItem {
    static #idCounter = 0;

    #id = TodoItem.#idCounter++;
    #completed = false;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get id() {
        return this.#id;
    }

    isCompleted() {
        return this.#completed;
    }

    toggleCompleted() {
        this.#completed = !this.#completed;
    }
}