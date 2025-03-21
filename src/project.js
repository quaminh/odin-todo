export default class Project {
    #list = [];

    constructor(name) {
        this.name = name;
    }

    get list() {
        return this.#list;
    }

    sort() {
        this.#list.sort((a, b) => {
            if (a.isCompleted()) return 1;
            return a.priority - b.priority;
        });
    }

    addItem(item) {
        this.#list.push(item);
        this.sort();
    }

    removeItem(index) {
        this.#list.splice(index, 1);
    }
}