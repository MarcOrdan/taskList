//DEFINE UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
    //ADD TASK EVENT
    form.addEventListener('submit', addTask);
    
    //REMOVE TASK EVENT
    taskList.addEventListener('click', removeTask);
    
    //CLEAR TASKS EVENT
    clearBtn.addEventListener('click', clearTasks)
    
    //FILTER TASKS EVENT
    filter.addEventListener('keyup', filterTasks)
    
    //DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTask);

}


//GET TASK FROM LS
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
          //CREATE LI ELEMENT
    const li = document.createElement('li');

    //ADD CLASS
    li.className = 'collection-item';

    //CREATE TEXT NODE AND APPEND TO LI
    li.appendChild(document.createTextNode(task));

    //CREATE NEW LINK ELEMENT
    const link = document.createElement('a');

    //ADD CLASS
    link.className='delete-item secondary-content';
    
    //ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //APPEND THE LINK TO THE LI
    li.appendChild(link);

    //APPEND LI TO THE UL
    taskList.appendChild(li);

    });
}

function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task')
    }

    //CREATE LI ELEMENT
    const li = document.createElement('li');

    //ADD CLASS
    li.className = 'collection-item';

    //CREATE TEXT NODE AND APPEND TO LI
    li.appendChild(document.createTextNode(taskInput.value));

    //CREATE NEW LINK ELEMENT
    const link = document.createElement('a');

    //ADD CLASS
    link.className='delete-item secondary-content';
    
    //ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //APPEND THE LINK TO THE LI
    li.appendChild(link);

    //APPEND LI TO THE UL
    taskList.appendChild(li);

    //STORE IN LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);


    //CLEAR INPUT
    taskInput.value='';

    e.preventDefault();
}

//STORE TASK IN LOCAL STORAGE
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//REMOVE TASK
function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            
            //REMOVE FROM LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
     
    }
}

//REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage (taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
          tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//CLEAR TASKS
function clearTasks(){
   //taskList.innerHTML ='';

   //faster code
   while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
   }

   //CLEAR FROM LOCAL STORAGE
   clearTasksFromLocalStorage();
}

//CLEAR TASK FROM LOCAL STORAGE
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


//FILTER TASKS
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display ='block';
        } else {
            task.style.display ='none';
        }
    });
}