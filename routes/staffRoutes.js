const express = require('express');
const router = express.Router();
const staffModel = require('../models/staffModel');

// create table.
router.get('/createTable', (request, response) => {
    const db = staffModel.getStaffModelInstance();

    const result = db.createTable();

    result
        .then(() => console.log("table created!"))
        .catch(err => console.log(err));
})

// create new staff
router.post('/insert', (request, response) => {
    const {
        name,
        email,
        employee_Id,
        first_employed
    } = request.body;
    const db = staffModel.getStaffModelInstance();

    const result = db.insertNewRecord(name, email, employee_Id, first_employed);

    result
        .then(data => response.json({
            data: data
        }))
        .catch(err => console.log(err));
});

// get all the staff members
router.get('/getAll', (request, response) => {
    const db = staffModel.getStaffModelInstance();

    const result = db.getAllData();

    result
        .then(data => response.json({
            data: data
        }))
        .catch(err => console.log(err));
})

// update staff members
router.patch('/update', (request, response) => {
    const {
        id,
        email
    } = request.body;
    const db = staffModel.getStaffModelInstance();

    const result = db.updateNameById(id, email);

    result
        .then(data => response.json({
            success: data
        }))
        .catch(err => console.log(err));
});

// delete staff member
router.delete('/delete/:id', (request, response) => {
    const {
        id
    } = request.params;
    const db = staffModel.getStaffModelInstance();

    const result = db.deleteRowById(id);

    result
        .then(data => response.json({
            success: data
        }))
        .catch(err => console.log(err));
});

router.get('/search/:name', (request, response) => {
    const {
        name
    } = request.params;
    const db = staffModel.getStaffModelInstance();

    const result = db.searchByName(name);

    result
        .then(data => response.json({
            data: data
        }))
        .catch(err => console.log(err));
})


module.exports = router;