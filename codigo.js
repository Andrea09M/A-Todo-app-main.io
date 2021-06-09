const btnDarkLigth = document.querySelector("#light-dark-mode");
let x = 0;
btnDarkLigth.addEventListener("click", function (){
    document.body.classList.toggle("light");

});

/*Añadir tareas a la lista*/

/*Variables*/

const inputTask = document.querySelector(".input-task");
const taskContainer = document.querySelector(".tasks-container");
const taskAdded = document.querySelector(".tasks-added");

/*Actualiza el numero de tareas restantes*/
const itemsLeft = document.querySelector(".n-items");
itemsLeft.textContent = printElementsLeft();

const filterTask = document.querySelectorAll(".filter")[0];
const filterTaskMobile = document.querySelectorAll(".filter")[1];
const btnClearTask = document.querySelector(".clear-completed")

console.log(btnClearTask);


/*Eventos*/

inputTask.addEventListener("keyup", addTasks);
taskContainer.addEventListener("click", interactiveTask);
filterTask.addEventListener("click", filterMyTask);
filterTaskMobile.addEventListener("click", filterMyTask);
btnClearTask.addEventListener("click", clearItems);

/*Funciones*/

function addTasks (e){

    if(e.keyCode === 13){

  /*Previene el envío del formulario*/

    e.preventDefault();

    if(inputTask.value != ""){
      /*Creacion del dic tareas añadidas*/

 const taskAdded = document.createElement("div");
 taskAdded.classList.add("tasks-added", "d-flex", "align-items-center", "p-3",
"border-bottom", "border-ligth");
taskContainer.appendChild(taskAdded);

/*Creación del label*/
 const labelTask = document.createElement("label");

 labelTask.classList.add("d-flex", "align-items-center", "cursor-pointer", "mb-0", "w-100");
 taskAdded.appendChild(labelTask);

 /* Creación del checkbox */
  
 const inputCheckbox = document.createElement("input");
 inputCheckbox.type = "checkbox";
 labelTask.appendChild(inputCheckbox);

 /* Creación del parrafo tarea*/
  
 const parrafoTask = document.createElement("p");
 parrafoTask.classList.add("mb-0", "ml-3");
 parrafoTask.textContent = inputTask.value;
 labelTask.appendChild(parrafoTask);
 inputTask.value ="";

 /*Botón equis x, "cerrar"*/

  const boxEquis = document.createElement("div");
  boxEquis.classList.add("cross", "cursor-pointer");
  taskAdded.appendChild(boxEquis);
 
  itemsLeft.textContent = printElementsLeft();
}
  }
}

function interactiveTask (e){
   /*Elimina el card a dar click en x*/

   if(e.target.classList.contains("cross")){
      e.target.parentElement.remove();
      itemsLeft.textContent = printElementsLeft();
      console.log();
   }else{
       /*Añade clase completado a la tarea, cuando este listo*/

   if(e.target.checked == true){
       e.target.parentElement.parentElement.classList.add("completed");
       itemsLeft.textContent = printElementsLeft();
   }else{
   e.target.parentElement.parentElement.classList.remove("completed");
   itemsLeft.textContent = printElementsLeft();
 } 
   }

  
}

/*Funcion que muestra items left*/
function printElementsLeft (){
  const tasks = Array.from(taskContainer.children);
  console.log(tasks);

  let toDoCompleted = tasks.filter(function(taskCard){
     if(!taskCard.classList.contains("completed")){
       return taskCard
    }
  });
  
  return toDoCompleted.length;

}

function filterMyTask (e){

  const task = Array.from(taskContainer.children);

  //Creando el iterador o ciclo
  task.forEach(function(taskCard){
    
  if(e.target.id == "all" ){
    taskCard.classList.add("d-flex");

    //Estilo del focus

    e.target.classList.add("checked");
    e.target.nextElementSibling.classList.remove("checked");
    e.target.nextElementSibling.nextElementSibling.classList.remove("checked");
  
  }else if(e.target.id == "active"){

    if(taskCard.classList.contains("completed")){
      taskCard.classList.add("d-none");
      taskCard.classList.remove("d-flex");
    }else{
      taskCard.classList.add("d-flex");
      taskCard.classList.remove("d-none");
    }
    
    //Estilo del focus

    e.target.classList.add("checked");
    e.target.previousElementSibling.classList.remove("checked");
    e.target.nextElementSibling.classList.remove("checked");

  }else if(e.target.id == "completed"){

    if(taskCard.classList.contains("completed")){
      taskCard.classList.add("d-flex");
      taskCard.classList.remove("d-none");
    }else{
      taskCard.classList.add("d-none");
      taskCard.classList.remove("d-flex");
    }
   

    //Estilo del focus

    e.target.classList.add("checked");
    e.target.previousElementSibling.classList.remove("checked");
    e.target.previousElementSibling.previousElementSibling.classList.remove("checked");
    
  }

  });

 
  
}

function clearItems(e){
  const tasks = Array.from(taskContainer.children);
  console.log(tasks);

  let arrayCompleted = tasks.filter(function(taskCard){
     if(taskCard.classList.contains("completed")){
       return taskCard
    }
  });

  arrayCompleted.forEach(function(element, i){
    arrayCompleted[i].remove();
  });

}

