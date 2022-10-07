function init() {
    //creating container for all elements.
    var container = document.createElement("div");
    container.setAttribute("id", "container")

    //creating main heading for page of home
    var mainTitle = document.createElement("h3")
    mainTitle.innerHTML = "ToDo List project"
    mainTitle.setAttribute("id", "mainTitle")
    document.body.append(mainTitle);

    //creating left div with its all elements
    var leftDiv = document.createElement("div");
    leftDiv.setAttribute("id", "left");

    var subgroup = document.createElement("div");
    subgroup.setAttribute("id", "subgroup");
    leftDiv.appendChild(subgroup);

    var subTitle = document.createElement("h2");
    subTitle.innerHTML = "task List";
    subgroup.appendChild(subTitle);
    subTitle.setAttribute("id", "subTitle");


    var addingButton = document.createElement("button");
    addingButton.innerHTML = "add item";
    addingButton.setAttribute("id", "adder");
    addingButton.addEventListener("click", createSection)
    leftDiv.appendChild(addingButton);

    container.appendChild(leftDiv);
    document.body.appendChild(container);
}
init();
function showData() {
    var todos = JSON.parse(localStorage.getItem("todos"));
    var lst;
    if (todos !== null) {
        lst = todos;
        var leftDiv = document.getElementById("left");
        var subgroup = document.getElementById("subgroup");
        subgroup.innerHTML = "";
        Array.from(lst).forEach(function (element, index) {
            var subcontainer = document.createElement("div");
            subcontainer.setAttribute("id", "subcontainer")

            var todoItem = document.createElement("input")
            todoItem.setAttribute("type", "text")
            todoItem.setAttribute("value", element)
            todoItem.setAttribute("id", "todoItem")
            todoItem.readOnly = true;

            var sw = document.createElement("label");
            var spw = document.createElement("span");
            sw.setAttribute("class", "switch");
            spw.setAttribute("class", "slider round");

            var check = document.createElement("input");
            check.setAttribute("id", "checkbox")
            check.setAttribute("type", "checkbox")
            check.onchange = function () {
                if (check.checked === false) {
                    todoItem.style.textDecoration = "none";
                }
                else {
                    todoItem.style.textDecoration = "line-through";
                }
            }

            sw.appendChild(check)
            sw.appendChild(spw)

            var removeBtn = document.createElement("button")
            removeBtn.setAttribute("class", "removeBtn")
            removeBtn.addEventListener("click", function (event) {
                var item = localStorage.getItem("todos");
                var target = event.target;
                var parent = target.parentElement;
                var targetText = parent.children[0].value;
                if (item === null) {
                    lst = [];
                } else {
                    lst = JSON.parse(item);
                    var indi = lst.indexOf(targetText)
                    lst.splice(indi, 1);
                    localStorage.setItem("todos", JSON.stringify(lst));
                }
                showData();
            })
            removeBtn.innerHTML = "X"

            var editBtn = document.createElement("button")
            editBtn.setAttribute("id", "editBtn")
            editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
            editBtn.setAttribute("onClick", `editb(${index})`);

            subcontainer.appendChild(todoItem)
            subcontainer.appendChild(sw)
            subcontainer.appendChild(removeBtn)
            subcontainer.appendChild(editBtn)
            subgroup.appendChild(subcontainer)

        })
    }
}
showData();
function createSection() {

    var subgroup = document.getElementById("subgroup");
    var subcontainer = document.createElement("div");
    subcontainer.setAttribute("id", "subcontainer")

    var todoItem = document.createElement("input")
    todoItem.setAttribute("type", "text")
    todoItem.setAttribute("id", "todoItem")
    todoItem.readOnly = false;
    todoItem.setAttribute("placeholder","enter your task")
    todoItem.style.border = "1px solid black"
    todoItem.style.cursor = "text"

    var sw = document.createElement("label");
    var spw = document.createElement("span");
    sw.setAttribute("class", "switch");
    spw.setAttribute("class", "slider round");

    var check = document.createElement("input");
    check.setAttribute("id", "checkbox")
    check.setAttribute("type", "checkbox")

    sw.appendChild(check)
    sw.appendChild(spw)

    var removeBtn = document.createElement("button")
    removeBtn.setAttribute("class", "removeBtn")
    removeBtn.innerHTML = "X"

    var editBtn = document.createElement("button")
    editBtn.setAttribute("id", "editBtn")
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>'

    subcontainer.appendChild(todoItem)
    subcontainer.appendChild(sw)
    subcontainer.appendChild(removeBtn)
    subcontainer.appendChild(editBtn)
    subgroup.appendChild(subcontainer)

    todoItem.addEventListener("keyup", function (event) {
        var value = todoItem.value;
        var code = event.code;
        if (value !== "" && code === "Enter") {
            var items = JSON.parse(localStorage.getItem("todos"));
            if (items === null) {
                list = [];
            } else {
                list = items;
            }
            list.push(value);
            localStorage.setItem("todos", JSON.stringify(list));
            showData();
        }
    })
}
function editb(index) {
    var items=JSON.parse(localStorage.getItem("todos"));
    if(items===null){
      list=[];
    }else{
      list=items;
    }
    var doc = prompt("Please give new value");
    list[index]=doc;
    localStorage.setItem("todos",JSON.stringify(list));
    showData();
}
