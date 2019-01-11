let input_field = document.getElementById('input_item');

//get all counts
function getCount() {
  let listElem = document.getElementById('to_do_list');
  let cnt = 0;
  for (item of listElem.children) {
    if (item.firstElementChild.className == 'unTicked') cnt++;
  }
  return cnt;
}

function updateTasksLeft() {
  let num = getCount();
  let field = document.getElementById('tasks_left');

  let message;
  if (num > 1) {
    message = `${num} tasks left to do`;
  } else if (num == 1) {
    message = `${num} task left to do`;
  } else {
    message = `All tasks done`
  }

  field.innerHTML = message;
}

function showAll() {
  //highlight the active button
  all.classList.add('active');
  finished.classList.remove('active');
  unfinished.classList.remove('active');
  let list = document.getElementById('to_do_list');

  for (item of list.children) {
    item.hidden = false;
  }
}

//logic for entering list items
input_field.addEventListener('keydown', function (event) {
  if (event.key == "Enter") {

    //create the list item
    let listElem = document.createElement('li');
    listElem.className = 'item';
    listElem.innerHTML = `<span>${input_field.value}</span>`;

    //insert it
    document.getElementById('to_do_list').prepend(listElem);
    input_field.value = null;

    //create cross element
    let cross = document.createElement('button');
    cross.className = "cross";
    cross.innerHTML = "[X]";
    cross.style.position = "absolute";
    //add event handler to cross element
    cross.addEventListener('click', function (event) {
      //remove list item
      listElem.remove();
      //remove cross with it
      cross.remove();

      updateTasksLeft();
    })

    //create tick element
    let tick = document.createElement('span');
    tick.className = 'unTicked';
    tick.tabIndex = "2";
    //insert the tick element
    listElem.prepend(tick);
    //add event listener to tick
    tick.addEventListener('click', function (event) {
      //check the state of the list element
      if (tick.className == 'unTicked') {
        //tick it
        tick.className = 'ticked';
        //cross out the task
        let task = tick.nextElementSibling;
        task.style.textDecoration = "line-through";
        task.style.color = "grey";
      } else {
        //untick it
        tick.className = 'unTicked';
        //remove cross out
        let task = tick.nextElementSibling;
        task.style.textDecoration = "none";
        task.style.color = "black";
      }
      updateTasksLeft();
    })

    // add event handler to list items
    listElem.addEventListener('mouseover', function (event) {
      //get the coordinates
      let coords = listElem.getBoundingClientRect();
      //append to document body
      document.body.append(cross);

      let top = coords.top + (listElem.offsetHeight - cross.offsetHeight) / 2;
      let left = coords.right - cross.offsetWidth - 10;
      //set the coordinates
      cross.style.top = top + 'px';
      cross.style.left = left + 'px';

    })
    listElem.addEventListener('mouseout', function (event) {
      //if the mouse has entered the cross, do nothing, otherwise remove cross
      if (!(event.relatedTarget == cross)) {
        cross.remove();
      }
    })
    updateTasksLeft();
    showAll();
  }
})

//logic for showing various state list items
finished.addEventListener('click', function (event) {
  //highlight the active button
  finished.classList.add('active');
  all.classList.remove('active');
  unfinished.classList.remove('active');
  let list = document.getElementById('to_do_list');

  for (item of list.children) {
    if (item.firstElementChild.className == 'unTicked') {
      item.hidden = true;
    } else {
      item.hidden = false;
    }
  }
})
unfinished.addEventListener('click', function (event) {
  //highlight the active button
  unfinished.classList.add('active');
  all.classList.remove('active');
  finished.classList.remove('active');
  let list = document.getElementById('to_do_list');

  for (item of list.children) {
    if (item.firstElementChild.className == 'ticked') {
      item.hidden = true;
    } else {
      item.hidden = false;
    }
  }
})
all.addEventListener('click', function (event) {
  showAll();
})