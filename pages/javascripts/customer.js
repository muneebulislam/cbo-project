function processSelection() {
  var selected = document.getElementById('select-option');

  switch (selected.value) {
    case "add":
      processOption(0);
      break;

    case "delete":
      processOption(1);
      break;

    case "update":
      processOption(2);
      break;

    case "show":
      processOption(3);
      domLoad();
      break;

    case "add-report":
      processOption(4);
      break;
  }
}

function processOption(index){
  const list = ["add-sec", "delete-sec", "update-row-sec","show-sec","update-report-sec"]
   list.forEach((x,ind) =>{
     if(ind==index){document.getElementById(x).hidden= false;}
     else{document.getElementById(x).hidden= true;}
   })
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:8080/customer/getAll')
    .then(response => response.json())
    .then(data => loadData(data['data']));

});

function domLoad() {
  fetch('http://localhost:8080/customer/getAll')
    .then(response => response.json())
    .then(data => loadData(data['data']));
}


const searchBtn = document.getElementById('search-btn');
searchBtn.onclick = function () {
  const searchValue = document.getElementById('search-input').value;

  fetch('http://localhost:8080/staff/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadData(data['data']));
}

const deleteBtn = document.getElementById('c-delete-btn');
deleteBtn.addEventListener('click', function () {
  let id = document.getElementById('c-delete').value;
  deleteRowById(id);
})
function deleteRowById(id) {
  fetch('http://localhost:8080/customer/delete/' + id, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        domLoad();
      }
    });
}


const updateBtn = document.getElementById('c-update-btn');
updateBtn.onclick = function () {

  const customerId = document.getElementById('c-update-ci-input').value;
  const updateEmailInput = document.getElementById('c-update-email-input').value;

  fetch('http://localhost:8080/customer/update', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      customer_Id: customerId,
      email: updateEmailInput
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        location.reload();
        // domLoad();
      }
    })
}

const updateReportBtn = document.getElementById('c-update-report-btn');
updateReportBtn.onclick = function () {

  const customerId = document.getElementById('update-report-ci-input').value;
  const updateReportInput = document.getElementById('c-update-report-input').value;

  fetch('http://localhost:8080/customer/update-report', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      customer_Id: customerId,
      report: updateReportInput
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        location.reload();
        // domLoad();
      }
    })
}




const addBtn = document.getElementById('submit');
addBtn.onclick = function () {
  const nameInput = document.getElementById('c-name-input').value;
  const emailInput = document.getElementById('c-email-input').value;
  const idInput = document.getElementById('c-id-input').value;
  // const fistEmployed = new Date().toLocaleDateString();
  const report = document.getElementById('report').value;

  fetch('http://localhost:8080/customer/insert', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name: nameInput,
      email: emailInput,
      customer_Id: idInput,
      report: report
    })
  })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
  console.log(data);
  var showSection = document.getElementById('show-sec');

  let div = `<div> <p>Name: ${data.name} emil: ${data.email} Customer Id: ${data.customer_Id}</p>
  <textarea >${data.report}</textarea></div>`
  div += showSection;
  document.getElementById('show-sec').innerHTML = div;
  location.reload();
}

function loadData(data) {
  let displayData = "";
  for (let i = 0; i < data.length; i++) {
    let div = `<div> <p>Name: ${data[i].name} emil: ${data[i].email} Customer Id: ${data[i].customer_Id}</p>
  <textarea >${data[i].report}</textarea></div>`;
    displayData += div;
  }
  document.getElementById('show-sec').innerHTML = displayData;
}
