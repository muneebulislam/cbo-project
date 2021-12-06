const mysql = require('mysql');
const db = require('./db');

const dbInstance = db.getDbInstance();
const con = dbInstance.getConnection(mysql);
let instance = null;

class CustomerModel {
    static getCustomerModelInstance() {
        return instance ? instance : new CustomerModel();
    }

    async createTable() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE IF NOT EXISTS customers (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), customer_Id VARCHAR(255), report TEXT, PRIMARY KEY (id))";

                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
        
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM customers ORDER BY customer_Id DESC";

                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewRecord(name, email, customerId, report) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO customers (name, email, customer_Id, report) VALUES (?,?,?,?)";

                con.query(query, [name, email, customerId, report], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id: insertId,
                name: name,
                email: email,
                customer_Id: customerId,
                report: report
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM customers WHERE customer_Id=?";

                con.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateEmailById(customerId, email) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE customers SET email = ? WHERE customer_Id = ?";

                con.query(query, [email, customerId], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async updateReportById(customerId, report) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE customers SET report = ? WHERE customer_Id = ?";

                con.query(query, [report, customerId], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
    

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM customers WHERE name = ?";

                con.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CustomerModel;