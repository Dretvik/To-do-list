    //Model
    var taskDescriptionInput = document.getElementById('taskDescription');
    var dueDateInput = document.getElementById('dueDate');
    var dueTimeInput = document.getElementById('dueTime');

    

    var model = {
        tasks: [
        {
            description:'Legge til punkter i lista!',
            isDone: false,
            importance: 5, 
            timestamp: new Date().toLocaleString(),  // Plukker ut Dato og tidspunkt
            dueDate: new Date().toLocaleDateString(), //Plukker ut bare datoen, og ikke klokkeslettet
            dueTime: '15:00',
        },
        ],
    }