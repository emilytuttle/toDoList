//Selects items for DOM manipulation
const wholeList = document.getElementById('whole-list')
const main = document.getElementById("main")
const menuListButton = document.getElementById("menu-list-button")
const menuAddButton = document.getElementById("menu-add-button")
const menuDeleteButton = document.getElementById("menu-delete-button")
const message = document.getElementById("message")
const formHere = document.getElementById("formHere")


// Gets the current date, then changes the format
const d = new Date()

let year = d.getFullYear()
let lastModif = new Date(document.lastModified);

// Adds the current date to the footer to show the last modification
let currentYear = document.getElementById("currentyear")
currentYear.textContent = year

let last = document.getElementById("lastModified")
last.textContent = lastModif

// List items go here, but an empty array provides a place for them to go. This list will be changed by different functions later.
let listItems = [];

// This function adds an item to the list. It uses push to add it to the end of the listItems array
function addToList(item) {
    listItems.push(item);
}

// This function removes an item from the list at the array index to differentiate
function removeFromList(currentItem) {
    let arrayIndex = currentItem.id[currentItem.id.length - 1];
    arrayIndex = parseInt(arrayIndex)
    console.log(arrayIndex)
    listItems.splice(arrayIndex, 1);
    addItemsToList()
}

// This function crosses out an item by adding a css class, this is done by adding it to an item by its array index. The css class adds the strikethrough
function crossOutItem(itemArrayIndex) {
    const element = document.getElementById(itemArrayIndex);
    element.classList.add("strikethrough");
}

// This function uncrosses out an item by removing a css class, this is done by removing it from an item by its array index. The css class adds the strikethrough
function unCrossOutItem(itemArrayIndex) {
    const element = document.getElementById(itemArrayIndex);
    element.classList.remove("strikethrough");
}   

// This function will get the ID of the clicked element. Then, depending on which page of the SPA is currently active, it will handle differences in what to do with list items when clicked. This is checked with a Native Array ES6 function, .includes(), to determine the class list and if .pageActive is part of that list.
function handleClick(event) {
    
    const itemId = event.target.id; 
    // Using Native Array ES6 function Array.from to access class lists
    classArrayList = Array.from(menuListButton.classList); 
    classArrayAdd = Array.from(menuAddButton.classList); 
    classArrayDelete = Array.from(menuDeleteButton.classList); 
    currentItem = document.getElementById(itemId)
    //Checks which page is currently active using above descriptions
    if (classArrayList.includes('pageActive')) {
        // if the My To Do List page is active, it uses a previously declared function to cross out items by id
        crossOutItem(itemId)
    } else if (classArrayAdd.includes('pageActive')) {
        // if the Add Items page is active, it sends the program to the next because nothing can be done to the already listed items here.
    } else if (classArrayDelete.includes('pageActive')) {
        // if the Delete Items page is active, it uses a previously declared function to delete out items by id
        removeFromList(currentItem)
    }

  }

// This function adds all of the items in the list to the DOM. It uses the Native Array ES6 function forEach to accomplish this. For each item in the array, a new ul element is created with the right classes, ids, and values, then they are added as a child to the previously declared list.
function addItemsToList() {
    wholeList.innerHTML = '';
    listItems.forEach((item, index) => {
        const newListItem = document.createElement('li')
        newListItem.setAttribute("id", `listItem${index}`)
        newListItem.setAttribute("class", "listItem")
        newListItem.textContent = item
        wholeList.appendChild(newListItem)
        newListItem.addEventListener("click", handleClick)
      });
}
// This function changes the SPA DOM when the My To Do List button is clicked
function addListToHome() {
    // New message added and form turned blank if another page was used first
    message.textContent = `Click an item to cross it off when you finished the task.`
    formHere.innerHTML = ``
    // Alter class lists to keep track of current page
    menuListButton.classList.add("pageActive");
    menuDeleteButton.classList.remove("pageActive");
    menuAddButton.classList.remove("pageActive");
    classArray = Array.from(menuListButton.classList); 
    // Call old function to add list items to the DOM
    addItemsToList()
}

// This function changes the SPA DOM when the Delete Items button is clicked
function showDeleteView() {
    // New message added and form turned blank if another page was used first
    message.textContent = `Click an item to delete it from your list`
    formHere.innerHTML = ``
    // Alter class lists to keep track of current page
    menuListButton.classList.remove("pageActive");
    menuDeleteButton.classList.add("pageActive");
    menuAddButton.classList.remove("pageActive");
    // Call old function to add list items to the DOM
    addItemsToList()
    
}

function showAddView() {
    // New message added and form content loaded
    message.textContent = `Write your task in the box and press submit`
    formHere.innerHTML = `
    <form>
        <input type="text" id="addItemField" class="for-form" name="addItemField" />
        <div id="submit" class="for-form">Submit</div>
    </form>
    `
    // Alter class lists to keep track of current page
    menuListButton.classList.remove("pageActive");
    menuDeleteButton.classList.remove("pageActive");
    menuAddButton.classList.add("pageActive");

    // Use recently created submit button, getting access from the javascript side and then adding an event listener
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", submitHandler);

   
}

function submitHandler() {
    // Prevent form from submitting normally
    event.preventDefault(); 
    const itemField = document.getElementById("addItemField")
    const item = itemField.value.trim();
    
    if (item) {  // Make sure input is not empty
        addToList(item);  // Add the current item to the list
        addItemsToList();  // Rerender the list
    }

    itemField.value = '' // blank out the current value so the input field is ready for a new value
}

// Add event listeners to previously created buttons to give them access to functions

menuListButton.addEventListener("click", addListToHome)
menuDeleteButton.addEventListener("click", showDeleteView)
menuAddButton.addEventListener("click", showAddView)
