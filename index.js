const groceryInput = document.querySelector('#grocery');
console.log(groceryInput);

const submitBtn = document.querySelector(".submit-btn");
console.log(submitBtn);

const list = document.querySelector('.grocery-list');
console.log(list);

const alert = document.querySelector('.alert');
console.log(alert);

const clearBtn = document.querySelector('.clear-btn');
console.log(clearBtn);

submitBtn.addEventListener("click", addItem);

clearBtn.addEventListener("click", clearItems);

let editElement = null;
let editFlag = false;
let editID = "";

function addItem(event) {
    event.preventDefault();
    const inputValue = groceryInput.value;
    console.log(inputValue)
    const newGroceryList = `
    <div class="grocery-list">
    // <article class="grocery-item">
    //     <p class="title">${inputValue}</p>
    //     <div class="btn-container">
    //         <button type="button" class="edit-btn">
    //             <i class="fa-solid fa-pen-to-square"></i>  
    //         <button type="button" class="delete-btn">
    //             <i class="fa-solid fa-trash"></i>
    //         </button>
    //     </div>
    //  </article>
    </div>
// `;

const id = new Date().getTime().toString();
const element = createListItem(id, inputValue);

    // Add item mode
    if(inputValue   !== "" && !editFlag) {
        list.appendChild(element);

        const groceryObject = {
            id: id,
            value: inputValue
        }
        console.log(groceryObject);
        // let itemsFromLocalStorage = JSON.parse(localStorage.getItem('list'));
        let itemsFromLocalStorage = getLocalStorage();

        console.log(itemsFromLocalStorage);

        // if(!itemsFromLocalStorage) {
        //     itemsFromLocalStorage = [];
        // }

        itemsFromLocalStorage.push(groceryObject);
        localStorage.setItem('list', JSON.stringify(itemsFromLocalStorage));

        groceryInput.value = "";

    displayAlert("item added to the list", 'success');
    } else if(inputValue !== "" && editFlag) {
        editElement.innerHTML = inputValue;f
        // let itemsFromLocalStorage = JSON.parse(localStorage.getItem('list'));
        let itemsFromLocalStorage = getLocalStorage();
        console.log('items: ', itemsFromLocalStorage);

        const updatedItems = itemsFromLocalStorage.map(function(item) {
            // console.log('item:' ; item);
            if (item.id === editID){
                item.value = inputValue;
            }
            return item;
    });

    console.log(updatedItems)

    localStorage.setItem('list', JSON.stringify(updatedItems))
    }
}

function deleteItem(event) {
    const element = event.currentTarget
    console.log(element);
    const parentOfDeleteBtn = element.parentElement
    console.log(parentOfDeleteBtn);
    const article = parentOfDeleteBtn.parentElement;
    console.log(article);
    list.removeChild(article);

    const deletedID = article.dataset.id;

    // let items = JSON.parse(localStorage.getItem(("list")));
    let items = getLocalStorage();

    console.log("items from localStorage: ", items);
    
    const newItems = items.filter(function(item) {
        if(item.id !== deletedID) return item;
    });

    console.log("newItems that deleted: ",newItems);

    localStorage.setItem('list', JSON.stringify(newItems))

    displayAlert('item removed!', 'danger');
}

function editItem(event) {
    editElement = event.currentTarget.parentElement.previousElementSibling;
    groceryInput.value = editElement.innerHTML;
    console.log(editElement);
    submitBtn.textContent = "edit";
    editFlag = true;

    const editElementID =
        event.currentTarget.parentElement.parentElement.dataset.id;
    editID = editElementID;
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    console.log(items);
    if(items.length > 0) {
        items.forEach(function(item) {
            console.log(item)
            list.removeChild(item)
        })
    }

    localStorage.removeItem('list');

    displayAlert('empty list', 'danger');

}

function setupItems() {
    // let itemsFromLocalStorage = JSON.parse(localStorage.getItem('list'));
    let itemsFromLocalStorage = getLocalStorage();

    itemsFromLocalStorage.forEach(function(item) {
    //     let attribute = document.createAttribute('data-id');
    //     attribute.value = item.id;
    //     element.setAttributeNode(attribute);
    //     element.classList.add('grocery-item');
    //     element.innerHTML = `
    //     <p class="title">${item.value}</p>
    //     <div class="btn-container">
    //         <button type="button" class="edit-btn">
    //             <i class="fa-solid fa-pen-to-square"></i>  
    //         <button type="button" class="delete-btn">
    //             <i class="fa-solid fa-trash"></i>
    //         </button>
    //     </div>
    // `;

    //     const editBtn = element.querySelector('.edit-btn')
    //     editBtn.addEventListener('click', editItem);
    //     const deleteBtn = element.querySelector('.delete-btn');
    // deleteBtn.addEventListener('click', deleteItem);

        const element = createListItem(item.id, item.value);
        list.appendChild(element);
    });
}

function displayAlert(alertText, action) {

    alert.textContent = alertText;
    alert.classList.add(`alert-${action}`)

    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 3000);
}

function  getLocalStorage() {
    if(localStorage.getItem('list')) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}

function createListItem(id, value) {
    const element = document.createElement("article");
    let attribute = document.createAttribute('data-id');
    attribute.value = id;
    element.setAttributeNode(attribute);
    element.classList.add('grocery-item');
    element.innerHTML =  `
    <p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
    `;

    const editBtn = element.querySelector('.edit-btn')
    editBtn.addEventListener('click', editItem);
    const deleteBtn = element.querySelector('.delete-btn')
    deleteBtn.addEventListener("click", deleteItem);

    return element;
}

window.addEventListener('DOMContentLoaded', setupItems);