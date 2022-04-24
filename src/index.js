let taskList = document.querySelector(".list");
let headerList = document.querySelector(".header-list");
let tasks = document.querySelectorAll(".task");
let closeButtons = document.querySelectorAll(".close-button");
let taskInput = document.querySelector(".input-text");
let textTask = document.querySelectorAll(".text-task");
let displayEmpty = document.querySelector(".display-empty");
let priorSelect = document.querySelector("#input-prior");

tasks[tasks.length-1].onload = animateTask(tasks[tasks.length-1]);

function renderTasks(){
	tasks = document.querySelectorAll(".task");

	if(tasks.length === 0){
		displayEmpty.classList.remove("hidden");
	}else if(tasks.length != 0){
		tasks[tasks.length-1].onload = animateTask(tasks[tasks.length-1]);
		displayEmpty.classList.add("hidden");
	}
}

function animateTask(task){
	setTimeout(function(){
		task.style.transform = "scale(1,1)";
		task.style.opacity = "1";
	}, 100)
}

priorSelect.value = 4;
let currentClass = 'prior'+priorSelect.value;

priorSelect.onchange = changePrior();
function changePrior(){
	currentClass = 'prior'+priorSelect.value;
	return currentClass;
}

function otherfunc(){
	for(let task of tasks){
		let close = task.querySelector(".close-button");
		let text = task.querySelector(".text-task");
		let check = task.querySelector(".checkbox-task");

		close.onclick = function(){
			setTimeout(function(){
				task.style.transform = "scale(0.9,0.9)";
				task.style.opacity = "0";
			},300)
			setTimeout(function(){
				task.remove();
			},500)
			renderTasks();
		}
		check.onchange = function(){
			task.classList.toggle("down-check");
			text.style.transition = "0.2s";
			text.classList.toggle("checked");
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
		let first = '<input type="text" value="'+taskInput.value+'" class="text-task '+changePrior()+'" data-numoftask="'+1+'">';
		let second = '<input type="checkbox" class="checkbox-task" data-numOfTask="'+1+'">';
		let third = '<button class="close-button" data-numOfTask="'+1+'">Close</button>';

		newTask.dataset.numoftask=1;
		newTask.innerHTML = first+second+third;
		taskList.append(newTask);
	}else{
		let first = '<input type="text" value="'+taskInput.value+'" class="text-task '+changePrior()+'" data-numoftask="'+(num+1)+'">';
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
});