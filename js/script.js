{
    const tasks = [
    ]

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTask = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="list__buttonTask list__buttonTask--done js-done">
            ${task.done ? " ✔ " : ""}
            </button>
            <span class="list__content ${task.done ? "list__content--done" : ""}">
            ${task.content}
            </span>
            <button class="list__buttonTask list__buttonTask--remove js-remove"> ✖
            </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newInputContent = document.querySelector(".js-newTask");
        const newTaskContent = newInputContent.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newInputContent.value = "";
        }

        newInputContent.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}