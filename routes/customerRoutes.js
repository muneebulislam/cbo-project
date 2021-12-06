const express = require('express');
const router = express.Router();
const customerModel = require('../models/customerModel');

// create table.
router.get('/createTable', (request, response) => {
    const db = customerModel.getCustomerModelInstance();

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
        customer_Id,
        report
    } = request.body;
    const db = customerModel.getCustomerModelInstance();

    const result = db.insertNewRecord(name, email, customer_Id, report);

    result
        .then(data => response.json({
            data: data
        }))
        .catch(err => console.log(err));
});

// get all the staff members
router.get('/getAll', (request, response) => {
    const db = customerModel.getCustomerModelInstance();

    const result = db.getAllData();

    result
        .then(data => response.json({
            data: data
        }))
        .catch(err => console.log(err));
})

// update customer 
router.patch('/update', (request, response) => {
    const customer_Id = request.body.customer_Id;
    const  email= request.body.email;
    const db = customerModel.getCustomerModelInstance();

    const result = db.updateEmailById(customer_Id, email);

    result
        .then(data => response.json({
            success: data
        }))
        .catch(err => console.log(err));
});

router.patch('/update-report', (request, response) => {
    const customer_Id = request.body.customer_Id;
    const  report= request.body.report;
    const db = customerModel.getCustomerModelInstance();

    const result = db.updateReportById(customer_Id, report);

    result
        .then(data => response.json({
            success: data
        }))
        .catch(err => console.log(err));
});

// delete customer
router.delete('/delete/:id', (request, response) => {
    const customer_Id = request.params.id;
    const db = customerModel.getCustomerModelInstance();

    const result = db.deleteRowById(customer_Id);

    result
        .then(data => response.json({
            success: data
        }))
        .catch(err => console.log(err));
});

router.delete('/repo', (request, response) => {
    const customer_Id = request.params.id;
    const db = customerModel.getCustomerModelInstance();

    const result = db.deleteRowById(customer_Id);

    result
        .then(data => response.json({
            success: data
        }))
        .catch(err => console.log(err));
});

// router.get('/search/:name', (request, response) => {
//     const {
//         name
//     } = request.params;
//     const db = staffModel.getStaffModelInstance();

//     const result = db.searchByName(name);

//     result
//         .then(data => response.json({
//             data: data
//         }))
//         .catch(err => console.log(err));
// })


module.exports = router;