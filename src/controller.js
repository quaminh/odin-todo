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

    const itemForm = document.querySelector("#item-form");
    const titleInput = document.querySelector("#title-input");
    const descriptionInput = document.querySelector("#desc-input");
    const dateInput = document.querySelector("#date-input");
    const priorityInput = document.querySelector("div.priority-btn-container");
    const priorityButtons = document.querySelectorAll(".priority-btn");
    let currentPriority = "LOW";

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

        currentProject.list.forEach((item, index) => {
            const itemCard = document.createElement("div");
            const itemTitle = document.createElement("h3");
            const itemCheckbox = document.createElement("input");
            const listItem = document.createElement("li");
            const deleteButton = document.createElement("button");
            const dropdownButton = document.createElement("button");

            itemCard.classList.add("item-card");
            itemCard.dataset.index = index;
            deleteButton.classList.add("delete-btn");
            dropdownButton.classList.add("dropdown-btn");

            let prio = "";
            if (item.priority === 1) prio = "high";
            if (item.priority === 2) prio = "med";
            if (item.priority === 3) prio = "low";
            itemCard.classList.add(`${prio}-priority`);

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

    itemList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            currentProject.removeItem(e.target.parentElement.dataset.index);
            updateScreen();
        }
    });

    priorityInput.addEventListener("click", (e) => {
        if (e.target.classList.contains("priority-btn")) {
            priorityButtons.forEach((button) => button.classList.remove("selected"));
            e.target.classList.add("selected");
            currentPriority = e.target.innerText;
        }
    });

    itemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!titleInput.value) {
            alert("Title cannot be empty");
        }
        else {
            const title = titleInput.value;
            const description = descriptionInput.value;
            const date = dateInput.value;
            let prio = 3;
            if (currentPriority === "MED") prio = 2;
            if (currentPriority === "HIGH") prio = 1;
            currentProject.addItem(new TodoItem(title, description, date, prio));
            updateScreen();
        }
    });

    generalProject.addItem(new TodoItem("Item1", "", "", 1));
    generalProject.addItem(new TodoItem("Item2", "", "", 2));
    generalProject.addItem(new TodoItem("Item3", "", "", 3));
    generalProject.addItem(new TodoItem("Item4", "", "", 3));

    projects[0].addItem(new TodoItem("Item1", "", "", 3));

    projects[1].addItem(new TodoItem("Item1", "", "", 3));
    projects[1].addItem(new TodoItem("Item2", "", "", 3));

    projects[2].addItem(new TodoItem("Item1", "", "", 3));
    projects[2].addItem(new TodoItem("Item2", "", "", 3));
    projects[2].addItem(new TodoItem("Item3", "", "", 3));

    updateScreen();
}