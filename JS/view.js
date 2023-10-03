//View

setInterval(checkAlarms, 60000);

function show() {
    const tasksTable = document.getElementById('tasksTable');
    let html =/*HTML*/`
            <tr>
                    <th>Oppgave</th>
                    <th>Gjort</th>
                    <th>Alarm?</th>
                    <th>Viktighetsgrad</th>
                    <th>Opprettet/Redigert Sist</th>
                    <th>Gjøre innen dato</th>
                    <th>Innen klokken</th>
                    <th></th>
                    <th></th>
            </tr>
             `;
    for (let taskIndex = 0; taskIndex < model.tasks.length; taskIndex++) {

        html += createHTMLRow(taskIndex);
    }
    tasksTable.innerHTML = html;
}

function createHTMLRow(taskIndex) {
    const task = model.tasks[taskIndex];
    const checkedHTML = task.isDone ? 'checked="checked"' : '';
    const isAlarmCheckedHTML = task.isAlarm ? 'checked="checked"' : '';
    const importanceClass = `importance-${task.importance}`;
    const timestamp = task.timestamp ? task.timestamp : 'N/A'; // Lager timestamp 
    const dueDate = task.dueDate ? task.dueDate : 'N/A'; // Lager en fullførings dato
    const dueTime = task.dueTime ? task.dueTime : 'N/A';
    if (!task.editMode) return /*HTML*/`
            <tr>
            <td>${task.description}</td>
                    <td><input class="checkboxes" onchange="changeIsDone(this,${taskIndex})" type="checkbox" ${checkedHTML}/></td>
                    <td><input class="checkboxes" id="alarmCheckBoxes" onchange="isAlarmOn(this,${taskIndex})" type="checkbox" ${isAlarmCheckedHTML}/></td>
                    <td class="${importanceClass}"><select onchange="changeImportance(this,${taskIndex})"class="${importanceClass}">
                        ${generateImportanceOptions(task.importance)}</select></td>
                        <td>${timestamp}</td>
                        <td>${dueDate}</td>
                        <td>${dueTime}</td>
                        <td><button id="deleteTaskButton" onclick="deleteTask(${taskIndex})">Slett</button></td>
                        <td><button onclick="editTask(${taskIndex})">Rediger</button></td>
            </tr>
            `;
    return /*HTML*/`
            <tr>
            <td><input id="editDescription${taskIndex}" type="text" value="${task.description}"/></td>
                    <td><input class="checkboxes" onchange="changeIsDone(this,${taskIndex})" type="checkbox" ${checkedHTML}/></td>
                    <td><input class="checkboxes" id="alarmCheckBoxes" onchange="isAlarmOn(this,${taskIndex})" type="checkbox" ${isAlarmCheckedHTML}/></td>
                    <td class="${importanceClass}"><select onchange="changeImportance(this,${taskIndex})"class="${importanceClass}">
                        ${generateImportanceOptions(task.importance)}
                        </select></td>
                        <td>${timestamp}</td>
                        <td><input id="editDueDate${taskIndex}" type="date" value="${dueDate}"/></td>
                        <td><input id="editDueTime${taskIndex}" type="time" value="${dueTime}"/></td>
                        <td><button id="deleteTaskButton" onclick="deleteTask(${taskIndex})">Slett</button></td>
                        <td><button onclick="saveTask(${taskIndex})">Lagre</button></td>
            </tr>
            `;
}

//Generere viktighetsgrad fra bruker selv kan velge
function generateImportanceOptions(selectedValue) {
    let optionsHTML = '';
    for (let i = 1; i <= 5; i++) {
        const selected = i === selectedValue ? 'selected' : '';
        optionsHTML += `<option ${selected}>${i}</option>`;
    }
    return optionsHTML;
}

// Funksjon for å sjekke alarmer
function checkAlarms() {
    const now = new Date();
    for (let taskIndex = 0; taskIndex < model.tasks.length; taskIndex++) {
        const task = model.tasks[taskIndex];
        if (task.isAlarm && !task.isDone) {
            const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
            if (dueDateTime <= now) {
                //Trigger en alarm
                alert(`Alarm for oppgave: ${task.description}`);
            }
        }
    }
}