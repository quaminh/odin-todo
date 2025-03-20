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
    const collapseFooterButton = document.querySelector("#collapse-footer");
    const deleteProjectButton = document.querySelector("#delete-project-btn");

    const newProjectButton = document.querySelector("#new-project-btn");
    const projectDialog = document.querySelector("dialog");
    const projectNameInput = document.querySelector("#project-name-input");
    const createProjectButton = document.querySelector("#create-project-btn");
    const cancelProjectButton = document.querySelector("#cancel-project-btn");

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

        if (currentProject === generalProject) {
            generalProjectButton.classList.add("selected");
            deleteProjectButton.classList.add("hide");
        }
        else {
            generalProjectButton.classList.remove("selected");
            deleteProjectButton.classList.remove("hide");
        }

        projects.forEach((project, index) => {
            const projectButton = document.createElement("button");
            const projectListItem = document.createElement("li");

            projectButton.classList.add("project-btn");
            if (project === currentProject) {
                projectButton.classList.add("selected");
            }

            projectButton.innerText = project.name;
            projectButton.dataset.index = index;

            projectListItem.appendChild(projectButton);
            projectList.appendChild(projectListItem);
        });

        listTitle.innerText = currentProject.name;
        if (currentProject.list.length === 0) itemList.innerText = "No items yet... Add some below!";

        currentProject.list.forEach((item, index) => {
            const itemCard = document.createElement("div");
            const itemDisplay = document.createElement("div");
            const itemTitle = document.createElement("h3");
            const itemDueDate = document.createElement("p");
            const itemCheckbox = document.createElement("input");
            const listItem = document.createElement("li");
            const deleteButton = document.createElement("button");
            const dropdownButton = document.createElement("button");
            const itemPanel = document.createElement("div");
            const itemDescription = document.createElement("p");
            const itemPriority = document.createElement("p");

            itemCard.classList.add("item-card");
            itemDisplay.classList.add("item-display");
            itemPanel.classList.add("item-panel", "hide");
            itemCard.dataset.index = index;
            itemDueDate.classList.add("due-date");
            deleteButton.classList.add("delete-btn");
            dropdownButton.classList.add("dropdown-btn");

            let prio = "";
            if (item.priority === 1) prio = "high";
            if (item.priority === 2) prio = "med";
            if (item.priority === 3) prio = "low";
            itemCard.classList.add(`${prio}-priority`);

            itemCheckbox.type = "checkbox";

            itemTitle.innerText = item.title;
            itemDueDate.innerText = item.dueDate;
            deleteButton.innerText = "X";
            dropdownButton.innerText = "V";
            itemDescription.innerText = (item.description) ? item.description : "No description";
            itemPriority.innerText = `Priority: ${prio.toUpperCase()}`;

            itemPanel.appendChild(itemDescription);
            itemPanel.appendChild(itemPriority);
            itemDisplay.appendChild(itemCheckbox);
            itemDisplay.appendChild(itemTitle);
            itemDisplay.appendChild(itemDueDate);
            itemDisplay.appendChild(deleteButton);
            itemDisplay.appendChild(dropdownButton);
            itemCard.appendChild(itemDisplay);
            itemCard.appendChild(itemPanel);
            listItem.appendChild(itemCard);
            itemList.appendChild(listItem);
        });
    };

    newProjectButton.addEventListener("click", (e) => {
        projectDialog.showModal();
    });

    createProjectButton.addEventListener("click", (e) => {
        if (projectNameInput.value) {
            projects.push(new Project(projectNameInput.value));
            currentProject = projects[projects.length-1];
            updateScreen();
            projectDialog.close();
        }
        else {
            alert("Project name cannot be empty");
        }
    });

    cancelProjectButton.addEventListener("click", (e) => {
        projectDialog.close(); 
    });

    deleteProjectButton.addEventListener("click", (e) => {
        if (currentProject !== generalProject) {
            projects.splice(projects.indexOf(currentProject), 1);
            currentProject = generalProject;
            updateScreen();
        }
    });

    collapseFooterButton.addEventListener("click", (e) => {
        itemForm.classList.toggle("hide");
    });

    generalProjectButton.addEventListener("click", (e) => {
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
        if (e.target.classList.contains("dropdown-btn")) {
            e.target.parentElement.nextSibling.classList.toggle("hide");
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

    generalProject.addItem(new TodoItem("Item1", "Hello", "", 1));
    generalProject.addItem(new TodoItem("Item2", "What's up?", "", 2));
    generalProject.addItem(new TodoItem("Item3", "Hey", "", 3));
    generalProject.addItem(new TodoItem("Item4", "Xin chao", "", 3));

    projects[0].addItem(new TodoItem("Item1", "", "", 3));

    projects[1].addItem(new TodoItem("Item1", "", "", 3));
    projects[1].addItem(new TodoItem("Item2", "", "", 3));

    projects[2].addItem(new TodoItem("Item1", "", "", 3));
    projects[2].addItem(new TodoItem("Item2", "", "", 3));
    projects[2].addItem(new TodoItem("Item3", "", "", 3));

    updateScreen();
}