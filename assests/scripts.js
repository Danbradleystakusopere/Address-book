// scripts.js

// Store contacts and their todos
const contacts = [];
let selectedContactIndex = null;

// Select elements
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoTitle = document.getElementById('todoTitle');

// Handle contact form submission
contactForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const newContact = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    address: document.getElementById('address').value.trim(),
    todos: []
  };

  contacts.push(newContact);
  renderContacts();
  contactForm.reset();
});

// Render contact list
function renderContacts() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${contact.name}</strong><br>${contact.phone}<br>${contact.email}<br>${contact.address}</td>
    `;
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => selectContact(index));
    contactList.appendChild(row);
  });
}

// Select a contact
function selectContact(index) {
  selectedContactIndex = index;
  todoTitle.textContent = `Manage To-Dos for ${contacts[index].name}`;
  todoForm.style.display = 'block';
  renderTodos();
}

// Handle todo form submission
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  if (selectedContactIndex === null) return;

  const task = todoInput.value.trim();
  if (task) {
    contacts[selectedContactIndex].todos.push({ task, completed: false });
    renderTodos();
    todoInput.value = '';
  }
});

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  if (selectedContactIndex === null) return;

  contacts[selectedContactIndex].todos.forEach((todo, todoIndex) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';

    const span = document.createElement('span');
    span.textContent = todo.task;
    if (todo.completed) {
      span.style.textDecoration = 'line-through';
    }

    const buttonsDiv = document.createElement('div');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', () => toggleTodoComplete(todoIndex));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.addEventListener('click', () => deleteTodo(todoIndex));

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);

    todoList.appendChild(li);
  });
}

// Toggle complete
function toggleTodoComplete(todoIndex) {
  const todo = contacts[selectedContactIndex].todos[todoIndex];
  todo.completed = !todo.completed;
  renderTodos();
}

// Delete todo
function deleteTodo(todoIndex) {
  contacts[selectedContactIndex].todos.splice(todoIndex, 1);
  renderTodos();
}
