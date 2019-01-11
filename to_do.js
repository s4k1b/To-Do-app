let listItems = [];
//logic for creating list elements from object
function createListItem(obj) {
  let li = document.createElement('li');
  li.className = 'item';

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
  //insert
  li.append(cross);

  return li;
}
//logic for rendering the list
function render(type) {
  let fragment = document.createDocumentFragment();
  if (type == 'all') {
    for (itemObj of listItems) {
      fragment.appendChild(createListItem(itemObj));
    }
  }
  console.log(fragment);
  document.getElementById('to_do_list').innerHTML = '';
  document.getElementById('to_do_list').appendChild(fragment);
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