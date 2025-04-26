document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
  
    
    if (!name || !phone || !email || !address) {
      alert('Please fill out all fields!');
      return;
    }
  
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${phone}</td>
      <td>${email}</td>
      <td>${address}</td>
    `;
  
    
    document.querySelector('tbody').appendChild(newRow);

    this.reset();
  });
  
  
