import Project from "./project";
import TodoItem from "./todo-item";
import { format } from "date-fns";

export default function Controller() {
    const generalProject = new Project("General");
    const projects = [];
    let currentProject = generalProject;

    const generalProjectButton = document.querySelector("#general-project-btn");
    const listTitle = document.querySelector("#list-title");
    const projectList = document.querySelector("#project-list");
    const itemList = document.querySelector("#item-list");
    const collapseFooterButton = document.querySelector("#collapse-footer");
    const deleteProjectButton = document.querySelector("#delete-project-btn");

    const newProjectButton = document.querySelector("#new-project-btn");
    const projectDialog = document.querySelector("#new-project-dialog");
    const projectNameInput = document.querySelector("#project-name-input");
    const createProjectButton = document.querySelector("#create-project-btn");
    const cancelProjectButton = document.querySelector("#cancel-project-btn");

    const editItemDialog = document.querySelector("#edit-item-dialog");
    const editItemTitle = document.querySelector("#edit-item-title");
    const editItemDesc = document.querySelector("#edit-item-desc");
    const editItemDate = document.querySelector("#edit-item-date");
    const editPriorityInput = document.querySelector("#edit-item-dialog .prio-btn-container");
    const editPriorityButtons = document.querySelectorAll(".edit-prio-btn");
    const saveEditButton = document.querySelector("#save-edit-btn");
    const cancelEditButton = document.querySelector("#cancel-edit-btn");
    let editingItemIndex = 0;
    let currentPriorityEdit = "LOW";

    const itemForm = document.querySelector("#item-form");
    const titleInput = document.querySelector("#title-input");
    const descriptionInput = document.querySelector("#desc-input");
    const dateInput = document.querySelector("#date-input");
    const priorityInput = document.querySelector("#item-form .priority-btn-container");
    const priorityButtons = document.querySelectorAll(".priority-btn");
    let currentPriorityNew = "LOW";

    const allInputs = document.querySelectorAll("input, textarea");

    const populateStorage = () => {
        const generalProjectList = [];
        generalProject.list.forEach((item) => {
            const itemObj = {
                title: item.title,
                description: item.description,
                dueDate: item.dueDate,
                priority: item.priority,
                completed: item.isCompleted()
            };
            generalProjectList.push(itemObj);
        });

        const storageProjects = [];
        projects.forEach((proj) => {
            const projectObj = {
                name: proj.name,
                list: []
            };
            proj.list.forEach((item) => {
                const itemObj = {
                    title: item.title,
                    description: item.description,
                    dueDate: item.dueDate,
                    priority: item.priority,
                    completed: item.isCompleted()
                };
                projectObj.list.push(itemObj);
            });
            storageProjects.push(projectObj);
        });

        localStorage.setItem("generalProject", JSON.stringify(generalProjectList));
        localStorage.setItem("projects", JSON.stringify(storageProjects));
    };

    const setProjects = () => {
        const generalProjectList = JSON.parse(localStorage.getItem("generalProject"));
        const projectsList = JSON.parse(localStorage.getItem("projects"));

        generalProjectList.forEach((item) => {
            const todo = new TodoItem(item.title, item.description, item.dueDate, item.priority);
            if (item.completed) todo.toggleCompleted();
            generalProject.addItem(todo);
        });

        projectsList.forEach((proj) => {
            const project = new Project(proj.name);
            proj.list.forEach((item) => {
                const todo = new TodoItem(item.title, item.description, item.dueDate, item.priority);
                if (item.completed) todo.toggleCompleted();
                project.addItem(todo);
            });
            projects.push(project);
        });
    };

    const resetInputs = () => {
        allInputs.forEach((inp) => inp.value = "");
    };

    const updateScreen = () => {
        projectList.innerText = "";
        itemList.innerText = "";

        currentProject.sort();

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
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");
            const dropdownButton = document.createElement("button");
            const itemPanel = document.createElement("div");
            const itemDescription = document.createElement("p");
            const itemPriority = document.createElement("p");

            itemCheckbox.type = "checkbox";

            itemCard.classList.add("item-card");
            itemDisplay.classList.add("item-display");
            itemPanel.classList.add("item-panel", "hide");
            itemCard.dataset.index = index;
            itemDueDate.classList.add("due-date");
            editButton.classList.add("edit-btn");
            deleteButton.classList.add("delete-btn");
            dropdownButton.classList.add("dropdown-btn");

            let prio = "";
            if (item.priority === 1) prio = "high";
            if (item.priority === 2) prio = "med";
            if (item.priority === 3) prio = "low";
            itemCard.classList.add(`${prio}-priority`);

            if (item.isCompleted()) {
                itemCard.classList.add("completed");
                itemCheckbox.checked = true;
            }

            itemTitle.innerText = item.title;
            itemDueDate.innerText = item.dueDate ? format(new Date(item.dueDate), "MMM d") : "";
            editButton.innerText = "//";
            deleteButton.innerText = "X";
            dropdownButton.innerText = "V";
            itemDescription.innerText = (item.description) ? item.description : "No description";
            itemPriority.innerText = `Priority: ${prio.toUpperCase()}`;

            itemPanel.appendChild(itemDescription);
            itemPanel.appendChild(itemPriority);
            itemDisplay.appendChild(itemCheckbox);
            itemDisplay.appendChild(itemTitle);
            itemDisplay.appendChild(itemDueDate);
            itemDisplay.appendChild(editButton);
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
            currentProject = projects[projects.length - 1];
            resetInputs();
            populateStorage();
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
            populateStorage();
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
        const itemCard = e.target.parentElement.parentElement;
        if (e.target.classList.contains("edit-btn")) {
            editingItemIndex = itemCard.dataset.index;
            const item = currentProject.list[editingItemIndex];
            editItemTitle.value = item.title;
            editItemDesc.value = item.description;
            editItemDate.value = item.dueDate;
            editPriorityButtons.forEach((btn) => btn.classList.remove("selected"));
            editPriorityButtons[3-item.priority].classList.add("selected");
            editItemDialog.showModal();
        }
        if (e.target.classList.contains("delete-btn")) {
            currentProject.removeItem(itemCard.dataset.index);
            populateStorage();
            updateScreen();
        }
        if (e.target.classList.contains("dropdown-btn")) {
            e.target.parentElement.nextSibling.classList.toggle("hide");
        }
        if (e.target.type === "checkbox") {
            currentProject.list[itemCard.dataset.index].toggleCompleted();
            populateStorage();
            updateScreen();
        }
    });

    editPriorityInput.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-prio-btn")) {
            editPriorityButtons.forEach((button) => button.classList.remove("selected"));
            e.target.classList.add("selected");
            currentPriorityEdit = e.target.innerText;
        }
    });

    saveEditButton.addEventListener("click", (e) => {
        if (editItemTitle.value) {
            const item = currentProject.list[editingItemIndex];
            item.title = editItemTitle.value;
            item.description = editItemDesc.value;
            item.dueDate = editItemDate.value;
            if (currentPriorityEdit === "LOW") item.priority = 3;
            if (currentPriorityEdit === "MED") item.priority = 2;
            if (currentPriorityEdit === "HIGH") item.priority = 1;
            populateStorage();
            updateScreen();
            editItemDialog.close();
        }
        else {
            alert("Title cannot be empty");
        }
    });

    cancelEditButton.addEventListener("click", (e) => {
        editItemDialog.close();
    });

    priorityInput.addEventListener("click", (e) => {
        if (e.target.classList.contains("priority-btn")) {
            priorityButtons.forEach((button) => button.classList.remove("selected"));
            e.target.classList.add("selected");
            currentPriorityNew = e.target.innerText;
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
            if (currentPriorityNew === "MED") prio = 2;
            if (currentPriorityNew === "HIGH") prio = 1;
            currentProject.addItem(new TodoItem(title, description, date, prio));
            resetInputs();
            populateStorage();
            updateScreen();
        }
    });

    if (!localStorage.getItem("generalProject") ||
        !localStorage.getItem("projects")) {
            populateStorage();
    }
    else {
        setProjects();
    }

    updateScreen();
}