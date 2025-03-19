import Project from "./project";
import TodoItem from "./todo-item";

export default function Controller() {
    const generalProject = new Project("General");
    const projects = [
        new Project("Project 1"),
        new Project("Project 2"),
        new Project("Project 3")];
    let currentProject = generalProject;

    const generalProjectButton = document.querySelector("#general-project-btn");
    const listTitle = document.querySelector("#list-title");
    const projectList = document.querySelector("#project-list");
    const itemList = document.querySelector("#item-list");

    const updateScreen = () => {
        projectList.innerText = "";
        itemList.innerText = "";

        projects.forEach((project, index) => {
            const projectButton = document.createElement("button");
            const projectListItem = document.createElement("li");

            projectButton.classList.add("project-btn");

            projectButton.innerText = project.name;
            projectButton.dataset.index = index;

            projectListItem.appendChild(projectButton);
            projectList.appendChild(projectListItem);
        });

        currentProject.list.forEach((item) => {
            const itemCard = document.createElement("div");
            const itemTitle = document.createElement("h3");
            const itemCheckbox = document.createElement("input");
            const listItem = document.createElement("li");
            const deleteButton = document.createElement("button");
            const dropdownButton = document.createElement("button");

            itemCard.classList.add("item-card");
            deleteButton.classList.add("delete-btn");
            dropdownButton.classList.add("dropdown-btn");

            itemCheckbox.type = "checkbox";

            listTitle.innerText = currentProject.name;
            itemTitle.innerText = item.title;
            deleteButton.innerText = "X";
            dropdownButton.innerText = "V"

            itemCard.appendChild(itemCheckbox);
            itemCard.appendChild(itemTitle);
            itemCard.appendChild(deleteButton);
            itemCard.appendChild(dropdownButton);
            listItem.appendChild(itemCard);
            itemList.appendChild(listItem);
        });
    };

    generalProjectButton.addEventListener("click", () => {
        currentProject = generalProject;

        updateScreen();
    });

    projectList.addEventListener("click", (e) => {
        if (!e.target.classList.contains("project-btn")) return;

        currentProject = projects[e.target.dataset.index];

        updateScreen();
    });

    generalProject.addItem(new TodoItem("Item1", "", "", ""));
    generalProject.addItem(new TodoItem("Item2", "", "", ""));
    generalProject.addItem(new TodoItem("Item3", "", "", ""));
    generalProject.addItem(new TodoItem("Item4", "", "", ""));

    projects[0].addItem(new TodoItem("Item1", "", "", ""));

    projects[1].addItem(new TodoItem("Item1", "", "", ""));
    projects[1].addItem(new TodoItem("Item2", "", "", ""));

    projects[2].addItem(new TodoItem("Item1", "", "", ""));
    projects[2].addItem(new TodoItem("Item2", "", "", ""));
    projects[2].addItem(new TodoItem("Item3", "", "", ""));

    updateScreen();
}