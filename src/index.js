let taskList = document.querySelector(".list");
let headerList = document.querySelector(".header-list");
let tasks = document.querySelectorAll(".task");
let closeButtons = document.querySelectorAll(".close-button");
let taskInput = document.querySelector(".input-text");
let textTask = document.querySelectorAll(".text-task");
let displayEmpty = document.querySelector(".display-empty");

function renderTasks(){
	tasks = document.querySelectorAll(".task");

	if(tasks.length === 0){
		displayEmpty.classList.remove("hidden");
	}else if(tasks.length != 0){
		displayEmpty.classList.add("hidden");
	}
}

function otherfunc(){
	for(let task of tasks){
		let close = task.querySelector(".close-button");
		let text = task.querySelector(".text-task");
		let check = task.querySelector(".checkbox-task");
		close.onclick = function(){
			task.remove();
			renderTasks();
		}
		check.onchange = function(){
			text.style.transition = "0.2s";
			text.classList.toggle("checked")
		}
		text.addEventListener("keydown", function(e){
			if(e.keyCode === 13){
				text.blur();
			}
		});		
	}
}
otherfunc();

function createTask(num){
	let newTask = document.createElement("div");

	newTask.classList.add('task');

	if(tasks.length === 0){
		let first = '<input type="text" value="'+taskInput.value+'" class="text-task" data-numoftask="'+1+'">';
		let second = '<input type="checkbox" class="checkbox-task" data-numOfTask="'+1+'">';
		let third = '<button class="close-button" data-numOfTask="'+1+'">Close</button>';

		newTask.dataset.numoftask=1;
		newTask.innerHTML = first+second+third;
		taskList.append(newTask);
	}else{
		let first = '<input type="text" value="'+taskInput.value+'" class="text-task" data-numoftask="'+(num+1)+'">';
		let second = '<input type="checkbox" class="checkbox-task" data-numOfTask="'+(num+1)+'">';
		let third = '<button class="close-button" data-numOfTask="'+(num+1)+'">Close</button>';

		newTask.dataset.numoftask=Number(tasks[tasks.length-1].dataset.numoftask)+1;
		newTask.innerHTML = first+second+third;
		taskList.append(newTask);
	}

	taskInput.value = '';
}

taskInput.addEventListener("keydown", function(e){
	if(e.keyCode === 13 && tasks.length != 0 && taskInput.value != ''){
		let lastNumTask = tasks[tasks.length-1].dataset.numoftask;

		createTask(Number(lastNumTask));
		renderTasks();
		otherfunc();
	}else if(e.keyCode === 13 && tasks.length === 0 && taskInput.value != ''){
		createTask(0);
		renderTasks();
		otherfunc();
	}
})