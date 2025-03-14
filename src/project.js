export default class Project {
    #list = [];

    constructor(name) {
        this.name = name;
    }

    get list() {
        return this.#list;
    }

    addItem(item) {
        this.#list.push(item);
    }

    removeItem(item) {
        this.#list = this.#list.filter((i) => {item.id !== i.id});
    }
}