(function(){
 let pomodoro = {};
 pomodoro.pmdrFull = 1500;
 pomodoro.pmdrPart = 300;
 pomodoro.countFull = 0;
 pomodoro.countParty = 0;
 pomodoro.isNewCycle = false;

 let audio = document.getElementById("alarm");

 let timeline = document.getElementById("timeline")
 timeline.classList.add("timeline-pointer-full")
 timeline.classList.add("timeline-pointer-paused")
 
 let startBtn = document.querySelector("#start");
 let resetBtn = document.querySelector("#reset");
 resetBtn.disabled = true
 let focusBtn = document.querySelector(".focus");
 
 function pomodoroFull(){
  console.log(pomodoro.countFull, pomodoro.countParty, pomodoro.isNewCycle)
  let seconds = pomodoro.pmdrFull;
  let minutes = Math.floor(seconds/60)
  seconds -= minutes * 60;
  pomodoro.minutes = document.querySelector(".timer-minutes");
  pomodoro.seconds = document.querySelector(".timer-seconds");
  pomodoro.minutes.innerHTML = ("0" + minutes).slice(-2);
  pomodoro.seconds.innerHTML = ("0" + seconds).slice(-2);
 }

 function pomodoroPart(){
  if(pomodoro.pmdrPart > 0){
    pomodoro.ticker = setInterval(() =>{
    pomodoro.pmdrPart--;
    timeline.classList.add("timeline-pointer-5min")

    let seconds = pomodoro.pmdrPart;
    let minutes = Math.floor(seconds/60)
    seconds -= minutes * 60;
    pomodoro.minutes = document.querySelector(".timer-minutes");
    pomodoro.seconds = document.querySelector(".timer-seconds");
    pomodoro.minutes.innerHTML = ("0" + minutes).slice(-2);
    pomodoro.seconds.innerHTML = ("0" + seconds).slice(-2);

    if(pomodoro.pmdrPart <= 0){
     let pomodoroContainer = document.querySelector(".pomodoro-container")
     pomodoroContainer.classList.add("blinker")

     let timeline = document.getElementById("timeline")
     timeline.classList.add("timeline-pointer-paused")
     timeline.classList.remove("timeline-pointer-5min")
     timeline.classList.add("timeline-pointer-full")
     
     clearInterval(pomodoro.ticker);
     
     pomodoro.pmdrPart = 0;
     pomodoro.countParty++;
     pomodoro.isNewCycle = true;
     audio.play()

     if(pomodoro.countFull == pomodoro.countParty && pomodoro.isNewCycle){
      pomodoro.pmdrFull = 1500;
      pomodoro.pmdrPart = 300;
      pomodoro.isNewCycle = false

      startBtn.removeEventListener("click", startFull)
      startBtn.removeEventListener("click", startPart)
      startBtn.addEventListener("click", startFull)
      startBtn.disabled = false

      if(pomodoro.countFull == 4 && pomodoro.countParty == 4){
       console.log("fim")
       pomodoro.countFull = 0;
       pomodoro.countParty = 0;
       pomodoro.pmdrFull = 1500;
       pomodoro.pmdrPart = 300;

       pomodoroContainer.classList.remove("blinker")
       pomodoroContainer.classList.remove("pomodoro-container-on")
       let timeline = document.getElementById("timeline")
       timeline.classList.add("timeline-pointer-full")
       timeline.classList.remove("timeline-pointer-5min")

       let cycles = document.getElementById("cycles")
       cycles.innerHTML = ""
       audio.pause()
      }
     }
     
     console.log(pomodoro.countFull, pomodoro.countParty, pomodoro.isNewCycle)
    }
   },1000)
  }
 }

 startBtn.addEventListener("click", startFull)
 function startFull(){
  startBtn.disabled = true
  resetBtn.disabled = false

  audio.pause()

  let pomodoroContainer = document.querySelector(".pomodoro-container")
  pomodoroContainer.classList.add("pomodoro-container-on")
  pomodoroContainer.classList.remove("blinker")
  let timeline = document.getElementById("timeline")
  timeline.classList.remove("timeline-pointer-5min")
  timeline.classList.add("timeline-pointer-full")
  timeline.classList.remove("timeline-pointer-paused")
  
  if(pomodoro.pmdrFull > 0){
   pomodoro.ticker = setInterval(() => {
    pomodoro.pmdrFull--;
    if(pomodoro.pmdrFull <= 0){
     startBtn.disabled = false

     timeline.classList.remove("timeline-pointer-full")
     timeline.classList.add("timeline-pointer-paused")
     timeline.classList.add("timeline-pointer-5min")

     clearInterval(pomodoro.ticker);

     pomodoro.pmdrFull = 0;
     pomodoro.countFull++;
     pomodoroContainer.classList.add("blinker");

     audio.play();

     let cycles = document.getElementById("cycles")
     switch (pomodoro.countFull) {
      case 1:
       cycles.innerHTML = "1st cycle complete"
       break;

      case 2:
       cycles.innerHTML = "2nd cycle complete"
       break;
      
      case 3:
       cycles.innerHTML = "3rd cycle complete"
       break;
      
      case 4:
       cycles.innerHTML = "4th cycle complete"
       break;

      default: 0
       break;
     }
     
     startBtn.addEventListener("click", startPart)
    }
    timeline.classList.add("timeline-pointer-full")
    pomodoroFull()
   },1000)
  }
 }
 function startPart(){
  audio.pause()
  let pomodoroContainer = document.querySelector(".pomodoro-container")
  pomodoroContainer.classList.remove("blinker")
  timeline.classList.remove("timeline-pointer-paused")
  timeline.classList.remove("timeline-pointer-full")
  timeline.classList.add("timeline-pointer-5min")
  pomodoroPart();
 }

 resetBtn.addEventListener("click", resetAll)
 function resetAll(){
  pomodoro.pmdrFull = 1500;
  pomodoro.pmdrPart = 300;
  pomodoro.countFull = 0;
  pomodoro.countParty = 0;
  pomodoro.isNewCycle = false;
  startBtn.disabled = false;
  resetBtn.disabled = true;

  let pomodoroContainer = document.querySelector(".pomodoro-container")
  pomodoroContainer.classList.remove("pomodoro-container-on")
  pomodoroContainer.classList.remove("blinker")

  let timeline = document.getElementById("timeline")
  timeline.classList.add("timeline-pointer-paused")
  timeline.classList.remove("timeline-pointer-full")
  timeline.classList.remove("timeline-pointer-5min")

  startBtn.removeEventListener("click", startFull)
  startBtn.removeEventListener("click", startPart)
  startBtn.addEventListener("click", startFull)

  let seconds = pomodoro.pmdrFull;
  let minutes = Math.floor(seconds/60)
  seconds -= minutes * 60;
  pomodoro.minutes.innerHTML = ("0" + minutes).slice(-2);
  pomodoro.seconds.innerHTML = ("0" + seconds).slice(-2);

  let cycles = document.getElementById("cycles")
  cycles.innerHTML = ""

  audio.pause()

  clearInterval(pomodoro.ticker);
 }

 focusBtn.addEventListener("click", focusFx);
 function focusFx(){
  let header = document.querySelector(".header");
  let todo = document.querySelector(".todo-list-container")
  let buttons = document.querySelector(".buttons")
  let footer = document.querySelector(".footer");
  if(header.classList[2] == "d-none"){
   header.classList.remove("d-none")
  }else{
   header.classList.add("d-none")
  }
  if(todo.classList[2] == "d-none"){
   todo.classList.remove("d-none")
  }else{
   todo.classList.add("d-none")
  }
  if(buttons.classList[2] == "buttons-opacity"){
   buttons.classList.remove("buttons-opacity")
  }else{
   buttons.classList.add("buttons-opacity")
  }
  if(footer.classList[4] == "d-none"){
   footer.classList.remove("d-none")
  }else{
   footer.classList.add("d-none")
  }
 }
 
 function closeToDo(){
  let close = document.getElementsByClassName("todo-list-li-close")
  let i;
  for(i=0;i<close.length;i++){
   close[i].onclick = function(){
    var div = this.parentElement;
    div.style.display = "none"
    snackbar("warning")
   }
  }
 }
 
 let list = document.querySelector(".todo-list-ul")
 list.addEventListener("click", checked, false);
 function checked(event){
  if(event.target.tagName === 'LI'){
   event.target.classList.toggle("checked");
  }
 }

 let btnTodo = document.getElementById("todo-btn")
 btnTodo.addEventListener("click", todoList)
 function todoList(event){
  event.preventDefault();
  
  let li = document.createElement("li");
  let input = document.getElementById("todo-input").value;
  let inputText = document.createTextNode(input);
  li.appendChild(inputText);
  
  if(input === ''){
   snackbar("danger")
  }
  if(input !== ''){
   snackbar("success")
   li.classList.add("todo-list-li")
   document.getElementById("todo-list-ul").appendChild(li)
  }

  let span = document.createElement("span")
  let spanX = document.createTextNode("\u00D7");
  span.className = "todo-list-li-close";
  span.appendChild(spanX);
  li.appendChild(span);

  console.log(li,input,span)
  closeToDo()
 }

 function snackbar(status){
  let snackbar = document.querySelector("#snackbar");
  if(status == "danger"){
   snackbar.classList.add("show-snackbar", "snackbar-danger")
   snackbar.innerHTML = "You cannot add an empty task!";
   setTimeout(function(){
    snackbar.classList.remove("show-snackbar", "snackbar-danger")
   },3000)
  }
  if(status == "warning"){
    let snackbar = document.querySelector("#snackbar");
    snackbar.classList.add("show-snackbar", "snackbar-warning")
    snackbar.innerHTML = "Task deleted!";
    setTimeout(function(){
    snackbar.classList.remove("show-snackbar", "snackbar-warning")
   },3000)
  }
  if(status == "success"){
   snackbar.classList.add("show-snackbar", "snackbar-success")
   snackbar.innerHTML = "Task successfully added";
   setTimeout(function(){
    snackbar.classList.remove("show-snackbar", "snackbar-success")
   },3000)
   let form = document.getElementsByClassName("todo-list-form")[0]
   form.reset()
  }
 }

})()