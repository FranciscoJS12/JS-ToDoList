// UI Variables
const form = document.getElementById('add-item');
const itemInput = document.getElementById('newItem');
const search = document.getElementById('search');
const itemList = document.querySelector('.item-list');
const deleteAllBtn = document.querySelector('.btn-clear');

// Load all Event Listeners
function loadEventListeners() {
  // Add item event
  form.addEventListener('submit', addItem);
  // Remove item or mark as done event
  itemList.addEventListener('click', controlItem);
  // Delete All event
  deleteAllBtn.addEventListener('click', deleteAll);
  // Search event
  search.addEventListener('keyup', searchList);
}
loadEventListeners();


// Add Item to list
function addItem(e){
  e.preventDefault();

  if(itemInput.value === ''){
    alert('Please write something first.');
    return;
  }

  // Create li element
  const li = document.createElement('li');
  // Add class to li element
  li.className = 'item-listed';

  // Create p element
  const itemText = document.createElement('p');
  // Add text to p element
  itemText.appendChild(document.createTextNode(itemInput.value));
  // Append p element to li
  li.appendChild(itemText);

  // Create control buttons span element
  const controls = document.createElement('span');
  // Add class to span
  controls.className = 'controls';
  // Add controls html code (this seems lazy but oh well)
  controls.innerHTML = '<a href="#" class="done"><i class="material-icons">done</i></a><a href="#" class="delete"><i class="material-icons">clear</i></a>';
  // Append controls to li
  li.appendChild(controls);

  // Append li to ul
  itemList.appendChild(li);

  // Clear input
  itemInput.value = '';
}

// Remove Item
function controlItem(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  } else if(e.target.parentElement.classList.contains('done') && e.target.parentElement.parentElement.parentElement.className === 'item-listed') {
    e.target.parentElement.parentElement.parentElement.className = 'item-listed item-done';
  } else if (e.target.parentElement.classList.contains('done') && e.target.parentElement.parentElement.parentElement.className === 'item-listed item-done') {
    e.target.parentElement.parentElement.parentElement.className = 'item-listed';
  }
}

// Delete All
function deleteAll(e) {
  if(confirm('Do you want to clear the list? This can\'t be undone.')) {
    while(itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
}

// Search (filter) list
function searchList(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.item-listed').forEach(function(item) {
    const itemListed = item.firstChild.textContent;
    if(itemListed.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

