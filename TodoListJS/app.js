//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos); // this basically calls the getTodos function once everything loads up on the webpage
todoButton.addEventListener('click', addTodo); //The addEventListener() method attaches an event handler to an element.
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(event){
    //  Prevent form from submitting
    //event.preventDeafault();
    //console.log('hello');
    // Todo DIV
    const todoDiv = document.createElement('div') // creating a div element.The <div> tag defines a division or a section in an HTML document. The <div> tag is used as a container for HTML elements - which is then styled with CSS or manipulated with JavaScript. The <div> tag is easily styled by using the class or id attribute. Any sort of content can be put inside the <div> tag!
    todoDiv.classList.add("todo");
    // Create Li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; // innerText is just a way to add text inside the li element
    // the inner text of the newTodo element is going to be the task that we're going to do, which we type into the todoInput element. We get the exact sentence from that input element using value
    newTodo.classList.add('todo-item'); // assign the class 'todo-item' to the newTodo element. (It's basically adding a class name to the class list that we just created for the newTodo elements)
    todoDiv.appendChild(newTodo); // this appends the item (li) to the list
    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'; // innerHTML changes the HTML content of an element
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton); // Add the "completed button" to the div
    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPEND TO UL LIST
    todoList.appendChild(todoDiv);
    // Clear Todo INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e){
    //console.log(e.target); //The target event property returns the element that triggered the event.
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        //item.remove(); // this removes the button
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove()
        }) // <-- this event listener ensures that we wait until the end of the transition (animation) and only then we remove the element
       
        // todo.remove(); <-- since if do the animation and leave this remove straight afterwards, we're gonna remove the element without the animation being played out. 
    }


    // CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo  = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'; // displaying the todo item
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'; // displaying the todo item
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })

}


function saveLocalTodos(todo){
    // checking if i have a todo list in my local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    todos.forEach(function(todo){
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo");
    // Create Li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item'); 
    todoDiv.appendChild(newTodo); 
    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'; 
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton); 
    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPEND TO UL LIST
    todoList.appendChild(todoDiv);
    })
}


function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem("todos", JSON.stringify(todos));
}

