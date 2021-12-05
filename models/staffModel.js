const mysql = require('mysql');
let instance = null;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'cbo-db',
});

con.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class StaffModel {
    static getStaffModelInstance() {
        return instance ? instance : new StaffModel();
    }

    async createTable() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE IF NOT EXISTS staff (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), employee_Id VARCHAR(255) , first_employed VARCHAR(50), PRIMARY KEY (id))";

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
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM staff ORDER BY first_employed DESC";

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


    async insertNewRecord(name, email, employeeId, date) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO staff (name, email, employee_Id, first_employed) VALUES (?,?,?,?)";

                con.query(query, [name, email, employeeId, date] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                email: email,
                employee_Id: employeeId,
                first_employed: date
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM staff WHERE id = ?";
    
                con.query(query, [id] , (err, result) => {
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

    async updateNameById(id, email) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE staff SET email = ?, WHERE id = ?";
    
                con.query(query, [email, id] , (err, result) => {
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
                const query = "SELECT * FROM staff WHERE name = ?;";

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

module.exports = StaffModel;