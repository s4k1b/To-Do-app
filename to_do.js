let listItems = [];
//logic for creating list elements from object
function createListItem(obj, ind) {
  let li = document.createElement('li');
  li.className = 'item';
  li.dataset.index = ind;
  //add necessary event listeners
  li.addEventListener('mouseenter', function (event) {
    cross.hidden = false;
  })
  li.addEventListener('mouseleave', function (event) {
    cross.hidden = true;
  })

  //create tick
  let tick = document.createElement('span');
  tick.className = obj.type;
  //insert tick element
  li.append(tick);

  //create text element
  let txt = document.createElement('span');
  txt.innerHTML = obj.text;
  txt.className = 'txt';
  if (obj.type == 'ticked') {
    txt.style.textDecoration = "line-through";
    txt.style.color = "grey";
  }
  //insert
  li.append(txt);

  //create cross element
  let cross = document.createElement('span');
  cross.innerHTML = '[X]';
  cross.className = 'cross';
  cross.hidden = true;
  //insert
  li.append(cross);

  return li;
}
//logic for toggling active buttons
function toggle(type) {
  if (type == 'ticked') type = 'finished';
  else if (type == 'unTicked') type = 'unfinished';
  let optionButtons = [document.getElementById('all'), document.getElementById('finished'), document.getElementById('unfinished')];
  for (let option of optionButtons) {
    if (option.id == type) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  }
}
//logic for displaying tasks left
function tasksLeftField(num) {
  let msg;
  if (num == 0) msg = `All tasks done!`;
  else if (num == 1) msg = `Only 1 task left to do.`;
  else msg = `${num} tasks left to do.`

  document.getElementById('tasks_left').innerHTML = msg;
}
//logic for rendering the list
function render(type) {
  let fragment = document.createDocumentFragment();
  let newList = [];
  if (type == 'all') {
    newList = listItems;
  } else {
    newList = listItems.filter(item => item.type == type);
  }

  let ind = 0;
  for (itemObj of newList) {
    fragment.appendChild(createListItem(itemObj, ind++));
  }
  //insert the elements
  document.getElementById('to_do_list').innerHTML = '';
  //console.log("appeinding Child");
  document.getElementById('to_do_list').appendChild(fragment);

  //toggle active buttons
  toggle(type);

  //display tasks left
  let num = newList.filter(item => item.type == 'unTicked').length;
  tasksLeftField(num);
}

//logic for recreating listItems form DOM
function reCreate() {
  let newListItems = [];
  for (item of document.getElementById('to_do_list').children) {
    newListItems.push({
      text: item.firstElementChild.nextElementSibling.innerHTML,
      type: item.firstElementChild.className
    })
  }
  listItems = newListItems;
}

let inputField = document.getElementById('input_item');

//logic for entering list items
inputField.addEventListener('keydown', function (event) {
  if (event.key == "Enter") {
    //enter the item
    listItems.push({
      text: inputField.value,
      type: "unTicked"
    });
    //render the list
    render('all');
    //clear the input field
    inputField.value = null;
  }
})

//add event listeners for tick and cross and options
document.addEventListener('click', function (event) {
  let targetElem = event.target.closest(".ticked, .unTicked, .cross, #all, #finished, #unfinished");

  if (!targetElem) return;

  if (targetElem.className == 'ticked') { //make it unticked
    let ind = targetElem.closest('li').dataset.index;
    listItems[ind].type = "unTicked";
    render('all');
  } else if (targetElem.className == 'unTicked') { //make it ticked
    let ind = targetElem.closest('li').dataset.index;
    listItems[ind].type = "ticked";
    render('all');
  } else if (targetElem.className == 'cross') {
    let item = targetElem.closest('li');
    //remove the item from the list
    item.remove();
    //update the listItems
    reCreate();
    // render the list
    render('all');
  } else if (targetElem.id == 'all') {
    render('all');
  } else if (targetElem.id == 'finished') {
    render('ticked');
  } else if (targetElem.id == 'unfinished') {
    render('unTicked');
  }
})