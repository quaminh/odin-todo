export default class Project {
    #list = [];

    constructor() {}

    addItem(item) {
        this.#list.push(item);
    }

    removeItem(item) {
        this.#list = this.#list.filter((i) => {item !== i});
    }
}