let taskList = document.querySelector(".list");
let headerList = document.querySelector(".header-list");
let tasks = document.querySelectorAll(".task");
let closeButtons = document.querySelectorAll(".close-button");
let taskInput = document.querySelector(".input-text");
let textTask = document.querySelectorAll(".text-task");

taskInput.addEventListener("keydown", function(e){
	if(e.keyCode === 13 && tasks.length != 0){
		let lastNumTask = tasks[tasks.length-1].dataset.numoftask;
		let first = '<input type="text" value="'+taskInput.value+'" class="text-task" data-numoftask="'+(Number(lastNumTask)+1)+'">';
		let second = '<input type="checkbox" class="checkbox-task" data-numOfTask="'+(Number(lastNumTask)+1)+'">';
		let third = '<button class="close-button" data-numOfTask="'+(Number(lastNumTask)+1)+'">Close</button>'
		let newTask = document.createElement("div");
		newTask.classList.add('task');
		newTask.dataset.numoftask=Number(tasks[tasks.length-1].dataset.numoftask)+1;
		newTask.innerHTML = first+second+third;
		taskList.append(newTask);
		taskInput.value = '';
		tasks = document.querySelectorAll(".task");

		for(let task of tasks){
			let close = task.querySelector(".close-button");
			let check = task.querySelector(".checkbox-task");
			let text = task.querySelector(".text-task");
			close.onclick = function(){
				task.remove();
				tasks = document.querySelectorAll(".tasks");
			}
			check.onchange = function(){
				text.classList.toggle("checked")
			}
		}
	}else if(e.keyCode === 13 && tasks.length === 0){
		let first = '<input type="text" value="'+taskInput.value+'" class="text-task" data-numoftask="'+1+'">';
		let second = '<input type="checkbox" class="checkbox-task" data-numOfTask="'+1+'">';
		let third = '<button class="close-button" data-numOfTask="'+1+'">Close</button>'
		let newTask = document.createElement("div");
		newTask.classList.add('task');
		newTask.dataset.numoftask=1;
		newTask.innerHTML = first+second+third;
		taskInput.value = '';
		
		console.log(tasks);
		taskList.append(newTask);

		tasks = document.querySelectorAll(".task");
		for(let task of tasks){
			let close = task.querySelector(".close-button");
			let text = task.querySelector(".text-task");
			let check = task.querySelector(".checkbox-task");
			close.onclick = function(){
				task.remove();
				tasks = document.querySelectorAll(".tasks");
			}
			check.onchange = function(){
				text.classList.toggle("checked")
			}		
		}
	}else if(e.keyCode === 13 && taskInput.value == ""){console.log(123)}
})

for(let task of tasks){
	let close = task.querySelector(".close-button");
	let check = task.querySelector(".checkbox-task");
	let text = task.querySelector(".text-task");
	close.onclick = function(){
		task.remove();
		tasks = document.querySelectorAll(".tasks");
	}
	check.onchange = function(){
		text.classList.toggle("checked")
	}
}

for(let text of textTask){
	text.addEventListener("keydown", function(e){
		if(e.keyCode === 13){
			text.blur();
		}
	});
}

