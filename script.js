const btnSend = document.querySelector(".btn_save");
const btnClose = document.querySelector(".btn-close");
const modal = document.querySelector(".wrapper__modal");
const btnEditTask = document.querySelector(".btnEdit");
const editName = document.querySelector(".edit-name");
const editDate = document.querySelector(".edit-date");
const editDescription = document.querySelector(".edit_decr");
const ol = document.querySelector("ol");
let arrTasks = [];

btnSend.addEventListener("click", getValueForm);
btnClose.addEventListener("click", closeModal);
ol.addEventListener("click", getElementList);
btnEditTask.addEventListener("click", editTaskfinish);

function getValueForm(event) {
    event.preventDefault();
    const form = document.querySelector(".formTask");
    const inputNameTask = document.querySelector(".name");
    const inputDedlineTask = document.querySelector(".date");
    const selectTypeTask = document.querySelector("select");
    const textereaTask = document.querySelector(".txt-page");
    console.log(textereaTask.value);
    const id = arrTasks.length;
    const objForm = createObjectForm(
        inputNameTask.value,
        inputDedlineTask.value,
        selectTypeTask.value,
        textereaTask.innerHTML,
        id
    );

    arrTasks.push(objForm);
    createListTasks(arrTasks);
    form.reset();
}

function createObjectForm(name, dedline, type, description, id) {
    return { name, dedline, type, description, id };
}

function createTask({ dedline, description, name, type }, id) {
    const li = document.createElement("li");
    li.id = id;
    const template = `
    <span>${name}</span>
    <span>${type}</span>
    <span>${dedline}</span>
    <span>${description}</span>
    <button class='btn_del-elements'>Del Elements</button>
    <button class= 'btn_open-modal'> open modal</buttom>
    `;
    li.innerHTML = template;
    return li;
}

function createListTasks(arr) {
    const ol = document.querySelector("ol");
    ol.innerHTML = "";
    arr.forEach((item, index) => {
        const resultli = createTask(item, index);
        ol.append(resultli);
    });
}

function openModal(id) {
    modal.classList.remove("none");
    const arrFilter = arrTasks.filter((item) => {
        if (item.id == id) {
            return true;
        } else {
            return false;
        }
    });
    console.log(arrFilter);

    editName.value = arrFilter[0].name;
    editDate.value = arrFilter[0].dedline;
    editDescription.innerHTML = arrFilter[0].description;
}

function closeModal(event, id) {
    event.preventDefault();
    modal.classList.add("none");
}

function getElementList(event) {
    const elemPage = event.target;
    if (elemPage.classList.contains("btn_open-modal")) {
        const parent = elemPage.parentNode;
        const idPage = parent.id;
        modal.id = idPage;
        openModal(idPage);
    }
}
function editTaskfinish(event) {
    event.preventDefault();
    const parent = event.target.parentNode.parentNode.parentNode;
    id = parent.id;
    const newArrTask = arrTasks.map((item, index) => {
        if (id == item.id) {
            console.log(item.name, item.description, item.dedline);
            // item.name = editName.value;
            // item.description = editDescription.value;
            // item.dedline = editDate.value;
        }
    });
    // arrTasks = newArrTask;
    // createListTasks(arrTasks)
}