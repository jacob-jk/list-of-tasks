{
  let tasks = [];
  let hideDone = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleTaskStatus = () => {
    hideDone = !hideDone;

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((task, index) => index !== taskIndex);
    render();
  };

  const toggleTask = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    render();
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString +=
        hideDone && task.done
          ? ""
          : `
            <li class="list__item">
                <button class="list__buttonTask 
        list__buttonTask--done js-done">
                    ${task.done ? " ✔ " : ""}
                </button>
                <span class="list__content 
        ${task.done ? "list__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="list__buttonTask 
        list__buttonTask--remove js-remove"> 
                    ✖
                </button>
            </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const statusButtons = document.querySelector(".js-toggleTaskStatus");

    if (!tasks.length) {
      statusButtons.innerHTML = "";
      return;
    }

    statusButtons.innerHTML = `
        <button class="section__buttons js-toggleCompleted">
        ${hideDone ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__buttons js-markCompleted"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;
  };

  const bindButtons = () => {
    const markAllCompletedButton = document.querySelector(".js-markCompleted");
    if (markAllCompletedButton) {
      markAllCompletedButton.addEventListener("click", markAllTasksDone);
    }

    const hideCompletedButton = document.querySelector(".js-toggleCompleted");
    if (hideCompletedButton) {
      hideCompletedButton.addEventListener("click", toggleTaskStatus);
    }
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleCompletedEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTask(index);
      });
    });
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindRemoveEvents();
    bindButtons();
    bindToggleCompletedEvents();
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
