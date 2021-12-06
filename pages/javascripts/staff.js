document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/staff/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

document.getElementById('tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.getElementById('update-btn');
const searchBtn = document.getElementById('search-btn');

searchBtn.onclick = function () {
    const searchValue = document.getElementById('search-input').value;

    fetch('http://localhost:8080/staff/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(id) {
    fetch('http://localhost:8080/staff/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}

function handleEditRow(id) {
    const updateSection = document.getElementById('update-row');
    updateSection.hidden = false;
    document.getElementById('update-email-input').dataset.id = id;
}

updateBtn.onclick = function () {
    const updateEmailInput = document.getElementById('update-email-input');

    console.log(updateEmailInput);

    fetch('http://localhost:8080/staff/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateEmailInput.dataset.id,
            email: updateEmailInput.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}


const addBtn = document.getElementById('submit');

addBtn.onclick = function () {
    const nameInput = document.getElementById('name-input').value;
    const emailInput = document.getElementById('email-input').value;
    const idInput = document.getElementById('id-input').value;
    const fistEmployed = new Date().toLocaleDateString();

    fetch('http://localhost:8080/staff/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: nameInput, email: emailInput, employee_Id: idInput, first_employed: fistEmployed })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.getElementById('tbody');
    const isTableData = table.getElementsByClassName('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;
    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {

        tableHtml += table;
    }
    location.reload();
}

function loadHTMLTable(myData) {
    if (myData.length === 0) {
        document.getElementById("tbody").innerHTML = "<tr><td class='no-data' colspan='7'>No Data</td></tr>";
        return;
    }
    let newTableBody = "";
    let dataObject = myData;
    for (let i = 0; i < dataObject.length; i++) {
        let tableRow = `<tr>
       <td>${dataObject[i].id}</td>
       <td>${dataObject[i].name}</td>
       <td>${dataObject[i].email}</td>
       <td>${dataObject[i].employee_Id}</td>
       <td>${dataObject[i].first_employed}</td>
       <td><button class="delete-row-btn" data-id=${dataObject[i].id}>Delete</button></td>
       <td><button class="edit-row-btn" data-id=${dataObject[i].id}>Edit</button></td>
       </tr>`;
        newTableBody += tableRow;
    }

    document.getElementById("tbody").innerHTML = newTableBody;
}