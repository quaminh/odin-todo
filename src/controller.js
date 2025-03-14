import Project from "./project";
import TodoItem from "./todo-item";

export default function Controller() {
    const generalProject = new Project("General");
    const projects = [
        new Project("Project 1"),
        new Project("Project 2"),
        new Project("Project 3")];
    const currentProject = generalProject;

    const listTitle = document.querySelector("#list-title");
    const projectList = document.querySelector("#project-list");
    const itemList = document.querySelector("#item-list");

    const updateScreen = () => {
        projectList.innerText = "";
        itemList.innerText = "";

        projects.forEach((project) => {
            const projectButton = document.createElement("button");
            const projectListItem = document.createElement("li");

            projectButton.innerText = project.name;

            projectListItem.appendChild(projectButton);
            projectList.appendChild(projectListItem);
        });

        currentProject.list.forEach((item) => {
            const itemButton = document.createElement("button");
            const listItem = document.createElement("li");

            listTitle.innerText = currentProject.name;
            itemButton.innerText = item.title;

            listItem.appendChild(itemButton);
            itemList.appendChild(listItem);
        });
    };

    generalProject.addItem(new TodoItem("Item1", "", "", ""));
    generalProject.addItem(new TodoItem("Item2", "", "", ""));
    generalProject.addItem(new TodoItem("Item3", "", "", ""));
    generalProject.addItem(new TodoItem("Item4", "", "", ""));

    updateScreen();
}