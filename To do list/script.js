const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";    
    saveData();
}

inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

listContainer.addEventListener("click" , function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function makeEditable(li) {
    const oldText = li.firstChild.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldText;
    li.innerHTML = '';        
    li.appendChild(input);
    input.focus();

function finish() {
    const newText = input.value.trim() || oldText;
    li.innerHTML = newText + '<span>×</span>';
    saveData();
    }
    input.addEventListener('blur', finish);
    input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        input.blur();
    }
    });
}

listContainer.addEventListener('dblclick', function(e) {
    if (e.target.tagName === 'LI') {
    makeEditable(e.target);
    }
});
