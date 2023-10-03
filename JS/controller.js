
//Controller

function addTask() {
    const currentDatestamp = new Date().toLocaleString(); //Får dato og tid
    const dueDate = dueDateInput.value;  // Får due date fra input feltet
    const dueTime = dueTimeInput.value; // Fåre due time fra input feltet
    const taskImportance = document.getElementById('taskImportance').value;
    model.tasks.push({
        description: taskDescriptionInput.value,
        isDone: false,
        isAlarm: false,
        importance: parseInt(taskImportance),
        timestamp: currentDatestamp, // Lagrer tid og dato
        dueDate: dueDate,   // Lagrer dueDate i oppgaven/task
        dueTime: dueTime,
    });
    taskDescriptionInput.value = ''; // Tømmer Description input felt
    // dueDateInput.value = ''; // Tømmer DueDate input felt
    // dueTimeInput.value = ''; // Tommer dueTime input felt
    show();
}

function changeImportance(selectedElement, index) {
    const newImportance = parseInt(selectedElement.value);
    model.tasks[index].importance = newImportance;
    show();
}

// hente index og lagre check
function changeIsDone(checkbox, index) {
    model.tasks[index].isDone = checkbox.checked;
    show();
}
// Hente index på valgt checkbox og lagre alarm
function isAlarmOn(checkbox, index) {
    model.tasks[index].isAlarm = checkbox.checked;
    show();
}

// Slette funksjon
function deleteTask(index) {
    model.tasks.splice(index, 1);
    show();
}

// Redigere oppgave
function editTask(index) {
    model.tasks[index].editMode = true;
    show();
}
function saveTask(index) {
    const task = model.tasks[index];
    const descriptionId = `editDescription${index}`;
    const dueDateId = `editDueDate${index}`;
    const dueTimeId = `editDueTime${index}`;
    const inputDescriptionTag = document.getElementById(descriptionId);
    const inputDueDateTag = document.getElementById(dueDateId);
    const inputDueTimeTag = document.getElementById(dueTimeId);

    task.description = inputDescriptionTag.value;
    task.dueDate = inputDueDateTag.value;
    task.dueTime = inputDueTimeTag.value;

    task.editMode = false;

    // Legger dato oppgaven ble endret
    const currentDatestamp = new Date().toLocaleString();
    task.datestamp = currentDatestamp;


    show();
}