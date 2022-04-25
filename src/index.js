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
			},100)
			setTimeout(function(){
				task.remove();
				renderTasks();
			},200)
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
		let first = '<div class="with-date"><input type="text" value="'+taskInput.value+'" class="text-task '+changePrior()+'" data-numoftask="'+1+'"><p>'+showCalendar.textContent+'</p></div>';
		let second = '<input type="checkbox" class="checkbox-task" data-numOfTask="'+1+'">';
		let third = '<button class="close-button" data-numOfTask="'+1+'">Close</button>';

		newTask.dataset.numoftask=1;
		newTask.innerHTML = first+second+third;
		taskList.append(newTask);
	}else{
		let first = '<div class="with-date"><input type="text" value="'+taskInput.value+'" class="text-task '+changePrior()+'" data-numoftask="'+(num+1)+'"><p>'+showCalendar.textContent+'</p></div>';
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



let calendar = document.querySelector(".calendar-div");
let calendarContainer = document.querySelector(".cont-calendar");
let showCalendar = document.querySelector(".calendar");
let dataButtons = document.querySelectorAll(".input-month");
let previousMonth = document.querySelector(".previous-month");
let nextMonth = document.querySelector(".next-month");
let currentMonth = document.querySelector(".without-days");
let currentData = document.querySelector(".select-data")
let saveData = document.querySelector(".ok-button-calendar");
let cancelData = document.querySelector(".cancel-button-calendar");

function saveDataTask(){
	showCalendar.textContent = currentData.textContent;
	calendarContainer.classList.toggle("hidden");
}

function cancelDataTask(){
	btnData();
	calendarContainer.classList.toggle("hidden");
}

saveData.addEventListener("click", saveDataTask);
cancelData.addEventListener("click", cancelDataTask);

function renderDays() {
	dataButtons = document.querySelectorAll(".input-month");

	for(let day of dataButtons){
		day.onclick = function(){
			for(let t of dataButtons){
				t.classList.remove("active-data");
			}
			day.classList.add("active-data");
			renderDataFull()
		}
	}
}


let data = new Date();
let month = data.getMonth()+1;
let year = data.getFullYear();
let currDay = data.getDate();

function btnData(){
	let a;
	if(month/10 < 1){
		a = "0"+month;
	}else{
		a = month;
	}

	if(currDay/10<1){
		currDay = "0"+currDay;
	}
	showCalendar.textContent = currDay+"."+a+"."+year;
}
btnData();

function createCalendar(elem, year, month) {
	let mon = month - 1;
	let d = new Date(year, mon);

	let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

	for(let i = 0; i < getDay(d); i++){
		table+='<td></td>';
	}	

	while (d.getMonth() == mon) {
		table += "<td><button class='input-month'>" + d.getDate() + "</button></td>";

		if (getDay(d) % 7 == 6){
			table+="</tr><tr>";
		}
		d.setDate(d.getDate() + 1);
	}

	if(getDay(d) != 0){
		for(let i = getDay(d);i<7;i++){
			table += '<td></td>';
		}
	}

	table += '</tr></table>';

	elem.innerHTML = table;
	renderDays();
}

function getDay(date){
	let day = date.getDay();
	if(day == 0) day = 7;
	return day - 1;
}

showCalendar.onclick = function() {
	let data = new Date();
	let month = data.getMonth()+1;
	let year = data.getFullYear();
	createCalendar(calendar, year, month);
	calendarContainer.classList.toggle("hidden");
	renderDays();
}

previousMonth.addEventListener("click", function(){
	month -= 1;
	if(month < 1){
		month = 12;
		year -= 1; 
	}
	renderDataMonth();
})

nextMonth.addEventListener("click", function(){
	month += 1;
	if(month > 12){
		month = 1;
		year += 1; 
	}
	renderDataMonth();
})

function renderDataMonth() {
	let a;
	if(month/10 < 1){
		a = "0"+month;
	}else{
		a = month;
	}
	currentMonth.textContent = a+"."+year;
	createCalendar(calendar, year, month);
	renderDays();
}

function renderDataFull() {
	let selectedDay = document.querySelector(".active-data");
	let c = Number(selectedDay.textContent);
	if(c/10<1){
		c = "0"+selectedDay.textContent;
	}else{
		c = selectedDay.textContent;
	}
	currentData.textContent = c+"."+currentMonth.textContent;
}