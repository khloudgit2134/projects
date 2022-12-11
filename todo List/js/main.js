
let submit = document.querySelector("#add");
let date = document.getElementById("date");
let cat = document.getElementById("cat");
let taskName = document.getElementById("txt");
let notes = document.getElementById("txt2");
let TasksDiv = document.getElementById("Alltasks");
let sec1 = document.getElementById("sec1");


let arrofTasks = [];
getdatafromLocalStorage();
//check if local storage contain tasks
if (localStorage.getItem("tasks")) {
    arrofTasks = JSON.parse(localStorage.getItem("tasks"));
}



submit.onclick = function () {
    if (taskName.value !== '' ) {
        addTasksToArray(taskName.value ,notes.value,cat.value,date.value); //tasks Array
        taskName.value = ""; //remove task name after add name to array
        notes.value = "";
        cat.value = "";
        date.value = "";
        
        
        
    }
};

 // if(e.target.parentElement){
    //  let txt = document.createElement("h2");
    //         txt.innerHTML = "No Tasks Yet!"
    //         txt.style = "color:#fff;text-align:center";
    //         sec1.appendChild(txt);
     
      
    // } 
//Del button
TasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnclass")) {
        deleteTaskWith(e.target.parentElement.getAttribute("data_id"));
           e.target.parentElement.remove();
           
    }
    if (e.target.classList.contains("myTask")) {
        togglethetask(e.target.getAttribute("data_id"));
        e.target.classList.toggle("done");
    }
    
    

});

function addTasksToArray(tasktxt) {
    const task = {
        id: Date.now(),
        compelete: false,
        title: tasktxt,
        thenotes: notes.value,
        category: cat.value,
        date:date.value,
        
    };
    //push task to the array
    arrofTasks.push(task);
    add_Ele_toPage(arrofTasks);
    // console.log(arrofTasks);
    addtaskstoLocalStoragefrom(arrofTasks);

}



function add_Ele_toPage(arrofTasks) {
    //empty tasks div
    TasksDiv.innerHTML = '';
    //looping in array of tasks
    arrofTasks.forEach(task => {
        let div = document.createElement("div");
        let p1 = document.createElement("P");
        let p2 = document.createElement("P");
        let p3 = document.createElement("P");
        let p4= document.createElement("P");
    
        div.className = "myTask";
        //check if task done
        if (task.compelete) {
            div.classList = "myTask done";
        }

        div.setAttribute("data_id", task.id); //id of task
     
 
        p1.appendChild(document.createTextNode(`Task  : ${task.title}`));
        p1.className = "par";
     
        p2.appendChild(document.createTextNode(`  Category : ${task.category} `));
         p2.className = "par";
        p3.appendChild(document.createTextNode(`Note: ${task.thenotes} `));
         p3.className = "par";
        p4.appendChild(document.createTextNode(`Date: ${task.date} `));
         p4.className = "par";
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(p4);
        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode(`Delete ×`));
        btn.className = "btnclass"; //del button
        // div.appendChild(btn);
        TasksDiv.appendChild(div);
        div.appendChild(btn);
     
        
       
       
    });
    
}
function addtaskstoLocalStoragefrom(arrofTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrofTasks));
}
function getdatafromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        add_Ele_toPage(tasks);
    }
}

function deleteTaskWith(taskid) {
    arrofTasks = arrofTasks.filter((task) => task.id != taskid);
    addtaskstoLocalStoragefrom(arrofTasks);
   
   
}
function togglethetask(taskid) {
    for (let i = 0; i < arrofTasks.length; i++){
        if (arrofTasks[i].id == taskid) {
            arrofTasks[i].compelete == false ? (arrofTasks[i].compelete = true) : (arrofTasks[i].compelete = false);
        }
    }
     addtaskstoLocalStoragefrom(arrofTasks);
}
 