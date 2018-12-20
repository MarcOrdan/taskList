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
    taskList.addEventListener('click',removeTask);

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

    //CLEAR INPUT
    taskInput.value='';

    e.preventDefault();
}

function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
     
    }
}   