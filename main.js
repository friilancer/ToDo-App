(function setDate(){
    let date = new Date();
    document.getElementById("elCom").classList.add("inactive");
    document.getElementById("date").append(date.toDateString());
    setTimeout(() =>{
      document.getElementById("popUp").setAttribute("style", "display:none");
    }, 2500)
})(); // Generate Current date onLoad

var create = document.getElementById('createTask');
var input = document.getElementById('inputTask');
var completedTask = document.getElementById('elCom');
var incompleteTask = document.getElementById('elInc');
var toDOElem = document.getElementById('createdTasks');
var taskCount = document.getElementById('taskCount');
var TODO_ARRAY = [];
var DONE_ARRAY = [];
window.addEventListener('keydown', function(event){
    if(event.key=='Enter'){
        create.onclick();
        event.preventDefault();
    }
} );
create.onclick = function() {
    if(input.value!=""){
        TODO_ARRAY.push(input.value.trim());
        let val = input.value; //retain inputed value
        input.value = "";
        createList(val);
        taskCount.textContent = `${TODO_ARRAY.length} Active Task${TODO_ARRAY.length>1?'s':''}`;
    }
};
function createList(newToDo){
        let task = document.createElement('div');
        let deleteProp = document.createElement('span');
        let completedProp = document.createElement('span');
        completedProp.classList.add("fa", "fa-check-circle", "check")
        deleteProp.classList.add("fa", "fa-trash", "del");
        deleteProp.onclick = deleteTask;
        completedProp.onclick = archiveTask;
        task.classList.add('task');
        task.append(completedProp);
        task.append(newToDo);
        task.append(deleteProp);    
        toDOElem.appendChild(task);
}
function generateArchiveTask(newToDo){
    let task = document.createElement('div');
    let deleteProp = document.createElement('span');
    deleteProp.classList.add("fa", "fa-trash", "del");
    deleteProp.onclick = deleteArchiveTask;
    task.classList.add('task');
    task.append(newToDo);
    task.append(deleteProp);    
    toDOElem.appendChild(task);    
}
function deleteTask(){
    let text = this.parentNode.textContent;
    this.parentNode.remove();
    TODO_ARRAY = TODO_ARRAY.filter(x => x != text);
    taskCount.textContent = `${TODO_ARRAY.length} Active Task${TODO_ARRAY.length>1?'s':''}`;
}
function archiveTask(){
    let text = this.parentNode.textContent;
    this.parentNode.remove();
    TODO_ARRAY = TODO_ARRAY.filter(x => x != text);
    DONE_ARRAY.push(text);
    taskCount.textContent = `${TODO_ARRAY.length} Active Task${TODO_ARRAY.length>1?'s':''}`;
}
function deleteArchiveTask(){
    let text = this.parentNode.textContent;
    this.parentNode.remove();
    DONE_ARRAY = DONE_ARRAY.filter(x => x != text);
    taskCount.textContent = `${DONE_ARRAY.length} Completed Task${DONE_ARRAY.length>1?'s':''}`;
}

completedTask.onclick = function(){
    if(DONE_ARRAY.length>0){
        while (toDOElem.firstChild) {
            toDOElem.removeChild(toDOElem.firstChild);
        }
        for (let i=0; i<DONE_ARRAY.length; i++){
            generateArchiveTask(DONE_ARRAY[i]);
        }
        taskCount.textContent = `${DONE_ARRAY.length} Completed Task${DONE_ARRAY.length>1?'s':''}`;
        create.classList.add('hide');
        input.classList.add('hide');
        completedTask.classList.remove('inactive');
        incompleteTask.classList.add('inactive');
    }
}

incompleteTask.onclick = function(){
    while (toDOElem.firstChild) {
        toDOElem.removeChild(toDOElem.firstChild);
    }
    for (let i=0; i<TODO_ARRAY.length; i++){
        createList(TODO_ARRAY[i]);
    }
    taskCount.textContent = `${TODO_ARRAY.length} active Task${TODO_ARRAY.length>1?'s':''}`;
    create.classList.remove('hide');
    input.classList.remove('hide');
    incompleteTask.classList.remove('inactive');
    completedTask.classList.add('inactive');
}