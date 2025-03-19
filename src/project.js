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
            return a.priority - b.priority;
        });
    }

    addItem(item) {
        this.#list.push(item);
        this.sort();
    }

    removeItem(item) {
        this.#list = this.#list.filter((i) => {item.id !== i.id});
    }
}