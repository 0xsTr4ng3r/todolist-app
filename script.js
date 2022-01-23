const frame = document.getElementById("frame");
let getData = JSON.parse(localStorage.getItem("datas"));
if(getData == ''){
    let datas = [
        {
            id : 1,
            task : "Example",
            status : false
        },
        {
            id : 2,
            task : "Example",
            status : false
        },
        {
            id: 3,
            task : "Example",
            status : false
        },
        {
            id: 4,
            task : "Example",
            status : false
        }
    ];
    localStorage.setItem("datas", JSON.stringify(datas));
};
let getTask = () => {
    let task = document.getElementById("task");
    if(task.value.length > 0){
        let data = {
            id : getData.length + 1,
            task : task.value,
            status : false
        };
        task.value = ``;
        getData.push(data);
        localStorage.setItem("datas", JSON.stringify(getData));
        addTask(getData);

        let msg = document.querySelector(".msg2");
        msg.classList.replace("hidden","flex");
        setTimeout(() => {
            msg.classList.replace("flex","hidden");
        }, 1700);
    };
};
let addTask = task => {
    frame.innerHTML = ``;
    task.forEach( (task,index) => {
        frame.innerHTML += `
        <div class="rounded-sm flex w-2/5 justify-between items-center px-2 py-3 my-2 mx-1 ${task.status ? 'bg-gray-400' : 'bg-white hover:shadow-md shadow'}" oncontextmenu="displayMenu(event,${index})">
        <input type="checkbox" name="ckbox" id="ckbox" onchange="taskDone(${index})" ${task.status ? 'checked' : ''}>
        <span class="task cursor-default ${task.status ? 'line-through' : ''}" onclick="taskDone(${index})">${task.task}</span>
        <button class="material-icons" onclick="deleteTask(${index})">delete_outline</button>                 
        </div>
        `;
    });
};
let deleteTask = index => {
    let confirmDel = confirm("Are u sure to delete this task?");
    if(confirmDel){
        getData.splice(index, 1);
        localStorage.setItem("datas", JSON.stringify(getData));
        addTask(getData);
        closeMenu();
        let msg = document.querySelector(".msg");
        msg.classList.replace("hidden","flex");
        setTimeout(() => {
            msg.classList.replace("flex","hidden");
        }, 1700);
    };
};
let taskDone = index => {
    getData[index].status = !getData[index].status;
    localStorage.setItem("datas", JSON.stringify(getData));
    addTask(getData);
    closeMenu();
};
let displayMenu = (e,i) => {
    e.preventDefault();
    let x = e.clientX + 'px';
    let y = e.clientY + 'px';
    let menu = document.querySelector(".menu");
    menu.children[0].value = i;
    menu.children[1].value = i;
    menu.style.left = x;
    menu.style.top = y;
    menu.classList.replace("hidden","fixed");
};
let closeMenu = () => {
    let menu = document.querySelector(".menu");
    menu.classList.replace("fixed","hidden");
}
addTask(getData);
